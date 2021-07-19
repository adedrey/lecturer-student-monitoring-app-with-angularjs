const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  seat_no: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Facility', facilitySchema);
