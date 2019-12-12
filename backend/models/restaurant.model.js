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
  reviewIds: {
    type: [String],
  },
  ownerId: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('restaurant', restaurantSchema);
