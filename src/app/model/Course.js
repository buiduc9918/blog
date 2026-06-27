const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const slugify = require("slugify");

const Course = new Schema(
  {
    name: { type: String, maxlength: 200 },
    slug: { type: String, maxlength: 200, unique: true, index: true },
    description: { type: String, maxlength: 500 },
    level: { type: String, maxlength: 500 },
    image: { type: String, maxlength: 500 },
    videoID: { type: String, maxlength: 200 },
  },
  {
    timestamps: true,
  },
);
Course.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

Course.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
});

module.exports = mongoose.model("Course", Course);
