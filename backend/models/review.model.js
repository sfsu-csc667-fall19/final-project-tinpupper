const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  text: {
    required: true,
    type: String
  },
  restaurantID: {
    required: true,
    type: [Number]
  }
});

module.exports = mongoose.model("review", reviewSchema);
