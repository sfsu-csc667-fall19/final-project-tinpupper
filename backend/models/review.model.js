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
    type: [mongoose.Schema.Types.ObjectId],
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('review', reviewSchema);
