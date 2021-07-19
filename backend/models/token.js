const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lecturerSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Token', lecturerSchema);
