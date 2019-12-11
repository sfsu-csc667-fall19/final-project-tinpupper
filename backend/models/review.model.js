const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  restaurantId: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('review', reviewSchema);
