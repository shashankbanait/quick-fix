const Booking = require('../models/Booking');
const Service = require('../models/Service');

// Create a booking
const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      bookingDate,
      bookingTime,
      location,
      description,
    } = req.body;

    // Get service details
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = new Booking({
      customerId: req.user.id,
      serviceId,
      providerId: service.providerId,
      bookingDate,
      bookingTime,
      location,
      description,
      estimatedCost: service.basePrice,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings for a user
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [
        { customerId: req.user.id },
        { providerId: req.user.id },
      ],
    })
      .populate('serviceId')
      .populate('customerId', 'name email phone')
      .populate('providerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId')
      .populate('customerId', 'name email phone address')
      .populate('providerId', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is provider or customer
    if (
      booking.providerId.toString() !== req.user.id &&
      booking.customerId.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is customer or provider
    if (
      booking.customerId.toString() !== req.user.id &&
      booking.providerId.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};
