const Course = require("../model/Course");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const mongoose = require("mongoose");


class CourseController {
  // [Get] /courses/creat
  async creat(req, res, next) {
    const filter = {};
    const courses = multipleMongooseToObject(await Course.find(filter));
    res.render("courses/creat", { courses });
  }
  // [Get] /courses/
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
      course.image =
        "http://img.youtube.com/vi/" + course.videoID + "/maxresdefault.jpg";
      await course.save();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
  // [Post] /courses/::id/edit
  async edit(req, res, next) {
    try {
      const query = req.params.id;
      const filter = { _id: query };
      const course = multipleMongooseToObject(await Course.find(filter));
      res.render("courses/edit", { course: course });
    } catch (error) {
      next(error);
    }
  }
  // [Put] /courses/:id/?_method=PUT
  async update(req, res, next) {
    console.log(req.params.id);
    try {
      Course.updateOne({ _id: req.params.id }, req.body).then(() =>
        res.redirect("/me"),
      );
    } catch (error) {
      next(error);
    }
  }
  // [DELETE] /courses/:id/delete
  destroy(req, res, next) {
    Course.findOneAndDelete( {_id: req.params.id })
      .then(() =>res.redirect("back"))
      .catch(next);
  }
}
module.exports = new CourseController();
