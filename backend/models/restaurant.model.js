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
  reviewerIds: {
    type: [String],
  },
  ownerId: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('restaurant', restaurantSchema);
