const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const adminSchema = new Schema({
  email : {
    required : true,
    type : String,
    unique : true
  },
  password : {
    required : true,
    type : String
  }
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);
