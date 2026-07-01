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
///custom query helper
Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidType = ["asc", "desc"].includes(req.query.type?.toLowerCase());
    const sortOrder = isValidType ? req.query.type : "desc";
    return this.sort({ [req.query.column]: sortOrder });
  }
  return this;
}
Course.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
});

module.exports = mongoose.model("Course", Course);
