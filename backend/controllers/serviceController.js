const Service = require('../models/Service');

// Create a service listing
const createService = async (req, res) => {
  try {
    const {
      serviceName,
      description,
      basePrice,
      experience,
      serviceArea,
      certifications,
    } = req.body;

    const service = new Service({
      providerId: req.user.id,
      serviceName,
      description,
      basePrice,
      experience,
      serviceArea,
      certifications: certifications || [],
    });

    await service.save();

    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services with filters and search
const getAllServices = async (req, res) => {
  try {
    const { serviceName, city, minPrice, maxPrice, search } = req.query;
    let filter = { isAvailable: true };

    if (serviceName) {
      filter.serviceName = serviceName;
    }

    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) {
        filter.basePrice.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.basePrice.$lte = Number(maxPrice);
      }
    }

    if (search) {
      filter.$or = [
        { serviceName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const services = await Service.find(filter).populate('providerId');

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('providerId');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by provider
const getServicesByProvider = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.params.providerId });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user is the provider
    if (service.providerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this service' });
    }

    const {
      serviceName,
      description,
      basePrice,
      experience,
      serviceArea,
      certifications,
      isAvailable,
    } = req.body;

    service.serviceName = serviceName || service.serviceName;
    service.description = description || service.description;
    service.basePrice = basePrice || service.basePrice;
    service.experience = experience || service.experience;
    service.serviceArea = serviceArea || service.serviceArea;
    service.certifications = certifications || service.certifications;
    service.isAvailable = isAvailable !== undefined ? isAvailable : service.isAvailable;

    await service.save();

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user is the provider
    if (service.providerId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'Not authorized to delete this service' });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
};
