const mongoose = require('mongoose');   
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, maxlength: 200 },
  description: { type: String, maxlength: 500 },
  image: { type: String, maxlength: 500 },
  creatAt: { type: Date, default: Date.now   },
  updatedAt: { type: Date, default: Date.now   }
});
module.exports = mongoose.model('Course', Course);