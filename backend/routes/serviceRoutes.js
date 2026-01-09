const express = require('express');
const {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.get('/provider/:providerId', getServicesByProvider);

// Protected routes
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
