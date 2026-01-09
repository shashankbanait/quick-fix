const express = require('express');
const {
  createRating,
  getServiceRatings,
  getProviderRatings,
  getMyRatings,
  updateRating,
  deleteRating,
} = require('../controllers/ratingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/service/:serviceId', getServiceRatings);
router.get('/provider/:providerId', getProviderRatings);

// Protected routes
router.post('/', protect, createRating);
router.get('/my-ratings', protect, getMyRatings);
router.put('/:id', protect, updateRating);
router.delete('/:id', protect, deleteRating);

module.exports = router;
