const mongoose = require('mongoose');

// ======= Databasega nma yozishni Schemalashtirish ======= //

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz nameni kiritishingiz shart!'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Siz duration kiritishingiz shart!'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Siz maxGroupSize kiritishingiz shart!'],
  },
  difficulty: {
    type: String,
    required: [true, 'Siz difficulty kiritishingiz shart!'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Siz price kiritishingiz shart!'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Siz summary kiritishingiz shart!'],
  },
  description: {
    type: String,
    required: [true, 'Siz description kiritishingiz shart!'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Siz imageCover kiritishingiz shart!'],
  },
  images: [String],
  startDates: [Date],
  createdAt: {
    select: false,
    type: Date,
    default: Date.now(),
  },
});
// Exports

module.exports = mongoose.model('tours', tourSchema);
