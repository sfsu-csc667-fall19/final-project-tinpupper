const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
  reviews: {
    required: true,
    type: [Number],
  },
});

module.exports = mongoose.model('restaurant', restaurantSchema);
