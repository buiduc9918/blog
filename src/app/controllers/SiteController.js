const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
      Course.find({}).then((courses)=>{
        res.render("home",{
          courses : multipleMongooseToObject(courses)
        })
      }).catch(next);
  }
  // [GET] /search
  search(req, res, next) {
    res.render("search", { title: "Search Results" });
  }

  // [POST] /store
  async store(req, res, next) {
    try {
      const { name, description, image } = req.body;
      const newCourse = new Course({
        name,
        description,
        image,
      });
      await newCourse.save();
      res.json({
        success: true,
        message: "Tạo khóa học thành công",
        course: newCourse,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SiteController();
