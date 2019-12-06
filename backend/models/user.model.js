const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  restaurantIds: {
    type: [String],
  },
  isBusiness: {
    required: true,
    type: Boolean,
  },
  reviewIds: {
    type: [String],
  },
});

module.exports = mongoose.model('user', userSchema);
