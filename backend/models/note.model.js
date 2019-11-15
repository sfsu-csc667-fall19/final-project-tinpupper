const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('note', noteSchema);
