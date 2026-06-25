const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
   // [GET] /me/store
  async stored(req, res, next) {
     try {
          const filter = {};
          const courses = multipleMongooseToObject(await Course.find(filter));
          if (!courses || courses.length === 0) {
            res.render("me/stored", { courses: courses });
          }
          res.render("me/stored", { courses: courses });
        } catch (error) {
          next(error);
        }
  }
}

module.exports = new MeController();
