const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const mongooseDelete = require('mongoose-delete');


class MeController {
  // [GET] /me/news
  index(req, res, next) {
    res.render("news");
  }
  // [GET] /me/store
  async stored(req, res, next) {
    try {
      const filter = {deleted:false};
      const courses = multipleMongooseToObject(await Course.find(filter));
      if (!courses || courses.length === 0) {
        res.render("me/stored", { courses: courses });
      }
      res.render("me/stored", { courses: courses });
    } catch (error) {
      next(error);
    }
  }
 // [GET] /me/trash/courses
async trash(req, res, next) {
    try {
        // Sử dụng findDeleted thay vì find thông thường
        const deletedCourses = await Course.findDeleted({}).lean(); 
        return res.render("me/trash", { 
            courses: deletedCourses 
        });
    } catch (error) {
        next(error);
    }
}
}

module.exports = new MeController();
