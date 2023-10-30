const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const partSchema = new mongoose.Schema({
  partNo: {
    type: String,
    unique: true,
    required: [true, "Part must"]
   
  },
  partName: {
    type: String,
    unique: true,
    required: [true, "Part Name must"]
    
  },
  customer: String,
  operationNo: String

});
partSchema.plugin(uniqueValidator);

module.exports = mongoose.model('part', partSchema);