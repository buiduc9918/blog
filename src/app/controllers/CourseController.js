const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class CourseController {
  index(req, res, next) {
    res.send("Giới thiệu khóa học");
  }
  async show(req, res, next) {
    try {
      const query = req.params.slug;
      const filter = { slug: query };
      const course = multipleMongooseToObject(await Course.find(filter));
      if (!course || course.length === 0) {
        return res.status(404).send("Course not found");
      }
      res.render("courses/show", { course: course });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CourseController();
