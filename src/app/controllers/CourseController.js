const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const mongoose = require('mongoose');
slug = require('mongoose-slug-generator');
mongoose.plugin(slug)

class CourseController {
  // [Get] /courses/creat
  async creat(req, res, next) {
    const filter = {};
    const courses = multipleMongooseToObject(await Course.find(filter));
    res.render("courses/creat", { courses });
  }
  // [Get] /courses/:slug
  async show(req, res, next) {
    try {
      const query = req.params.slug;
      const filter = { slug: query };
      const course = multipleMongooseToObject(await Course.find(filter));
      if (!course || course.length === 0) {
        res.render("courses/show", { course: course });
      }
      res.render("courses/show", { course: course });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /courses/store
  async store(req, res, next) {
    try {
      const course = new Course(req.body);
      course.slug = course.name ;
      course.image = "http://img.youtube.com/vi/" + course.videoID + "/default.jpg";
      await course.save().then(() => res.redirect("/"));
    } catch (error) {
      next(error);
      console.log(error);
      res.json(req.body);
    }
  }
}
module.exports = new CourseController();
