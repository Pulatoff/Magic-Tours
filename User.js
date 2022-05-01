const mongoose = require('mongoose');

const tour = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz malumot kiritishingiz shart'],
    min: [10, 'Siz 10 ta dan kam bulmagan ism nomini kiritishngiz shart'],
    max: 20,
    unique: [true, 'Bunday DataBaseda mavjud'],
  },
  age: {
    type: Number,
    default: 4.5,
  },

  country: String,
});

module.exports = mongoose.model('User', tour);
