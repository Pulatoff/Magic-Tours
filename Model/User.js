const mongoose = require('mongoose');

// ======= Databasega nma yozishni Schemalashtirish ======= //

const tourSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
});

// Exports

module.exports = mongoose.model('User', tourSchema);
