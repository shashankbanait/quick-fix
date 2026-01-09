const Rating = require('../models/Rating');
const Booking = require('../models/Booking');
const Service = require('../models/Service');

// Create a rating/review
const createRating = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is customer
    if (booking.customerId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'Only customers can rate services' });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res
        .status(400)
        .json({ message: 'Can only rate completed bookings' });
    }

    // Check if already rated
    const existingRating = await Rating.findOne({ bookingId });
    if (existingRating) {
      return res
        .status(400)
        .json({ message: 'This booking has already been rated' });
    }

    const newRating = new Rating({
      bookingId,
      customerId: req.user.id,
      serviceId: booking.serviceId,
      providerId: booking.providerId,
      rating,
      comment,
    });

    await newRating.save();

    // Update service rating
    const allRatings = await Rating.find({ serviceId: booking.serviceId });
    const avgRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await Service.findByIdAndUpdate(booking.serviceId, {
      rating: avgRating,
      totalReviews: allRatings.length,
    });

    res.status(201).json({
      success: true,
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a service
const getServiceRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ serviceId: req.params.serviceId })
      .populate('customerId', 'name profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a provider
const getProviderRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      providerId: req.params.providerId,
    })
      .populate('customerId', 'name profileImage')
      .populate('serviceId', 'serviceName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings by a customer
const getMyRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ customerId: req.user.id })
      .populate('serviceId')
      .populate('providerId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a rating
const updateRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    let ratingDoc = await Rating.findById(req.params.id);

    if (!ratingDoc) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Check if user is the one who created the rating
    if (ratingDoc.customerId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'Not authorized to update this rating' });
    }

    ratingDoc.rating = rating || ratingDoc.rating;
    ratingDoc.comment = comment || ratingDoc.comment;

    await ratingDoc.save();

    // Update service rating
    const allRatings = await Rating.find({ serviceId: ratingDoc.serviceId });
    const avgRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await Service.findByIdAndUpdate(ratingDoc.serviceId, {
      rating: avgRating,
    });

    res.status(200).json({
      success: true,
      rating: ratingDoc,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a rating
const deleteRating = async (req, res) => {
  try {
    const ratingDoc = await Rating.findById(req.params.id);

    if (!ratingDoc) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Check if user is the one who created the rating
    if (ratingDoc.customerId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'Not authorized to delete this rating' });
    }

    await Rating.findByIdAndDelete(req.params.id);

    // Update service rating
    const allRatings = await Rating.find({ serviceId: ratingDoc.serviceId });
    const avgRating =
      allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
        : 0;

    await Service.findByIdAndUpdate(ratingDoc.serviceId, {
      rating: avgRating,
      totalReviews: allRatings.length,
    });

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRating,
  getServiceRatings,
  getProviderRatings,
  getMyRatings,
  updateRating,
  deleteRating,
};
