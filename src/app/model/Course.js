const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, maxlength: 200 },
  slug: { type: String, maxlength: 200, unique: true, index: true },
  description: { type: String, maxlength: 500 },
  level: { type: String, maxlength: 500 },
  image: { type: String, maxlength: 500 },
  videoID: { type: String, maxlength: 200 },
},{
  timestamps:true
});

module.exports = mongoose.model("Course", Course);
