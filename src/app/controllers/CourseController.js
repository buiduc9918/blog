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
  // [GET] /courses/:slug hoặc /courses
  show(req, res, next) {
    const { slug } = req.params;
    const filter = slug ? { slug } : {};
    Course.find(filter)
      .then((courses) => {
        res.render("courses/show", {
          course: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [POST] /courses/store
  store(req, res, next) {
    req.body.image =
      `http://img.youtube.com/vi/${req.body.videoID}/maxresdefault.jpg`;

   // Dùng findWithDeleted để tìm thấy cả các khóa học đã bị xóa mềm trước đó
    Course.findWithDeleted({})
        .sort({ _id: -1 })
        .limit(1)
        .then((courses) => {
            const lastCourse = courses[0];
            req.body._id = lastCourse ? lastCourse._id + 1 : 1;
            const course = new Course(req.body);
            return course.save();
        })
        .then(() => res.redirect("/me/stored/courses"))
        .catch(next);
  }
  // [Post] /courses/::id/edit
   edit(req, res, next) {
    const query = req.params.id;
    const filter = { _id: query };
    Course.find(filter)
      .then((courses) => {
        res.render("courses/edit", {
          course: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [Put] /courses/:id/?_method=PUT
  async update(req, res, next) {
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
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [Patch] /courses/:id/restore?_method=Patch
  restore(req, res, next) {
    console.log(req.params.id);
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch();
  }
  // [DELETE] /courses/:id/force
  force(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //method="POST" class="mt-4"  action="/courses/handle-form-action">
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "DELETE":
        Course.delete({ _id: { $in: req.body.coursesIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "RESTORE":
        Course.restore({
          _id: { $in: req.body.coursesIds },
        })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }
}
module.exports = new CourseController();
