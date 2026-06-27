const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const mongooseDelete = require("mongoose-delete");

class MeController {
  // [GET] /me/news
  index(req, res, next) {
    res.render("news");
  }
  // [GET] /me
  stored(req, res, next) {
    Promise.all([Course.find({ deleted: false }),Course.countDocumentsDeleted()])
    .then(([courses,deletedCount])=>{
       res.render("me/stored", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
    }).catch(next);
  }
  // [GET] /me/trash/courses
  async trash(req, res, next) {
    try {
      // Sử dụng findDeleted thay vì find thông thường
      const deletedCourses = await Course.findDeleted({}).lean();
      return res.render("me/trash", {
        courses: deletedCourses,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
