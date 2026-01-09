const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceName: {
      type: String,
      enum: ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Home Cleaning'],
      required: [true, 'Please select a service'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a service description'],
      maxlength: 1000,
    },
    basePrice: {
      type: Number,
      required: [true, 'Please provide a base price'],
      min: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    serviceArea: {
      type: String,
      required: true,
    },
    certifications: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
