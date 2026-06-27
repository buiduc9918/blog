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
  async show(req, res, next) {
    try {
      const { slug } = req.params;
      // 1. Tạo filter động: Nếu có slug thì lọc theo slug, không thì lấy tất cả
      const filter = slug ? { slug } : {};
      // 2. Lấy dữ liệu từ database
      const coursesData = await Course.find(filter);
      const course = multipleMongooseToObject(coursesData);
      // 3. Kiểm tra dữ liệu (Sử dụng return để chặn lỗi bùng nổ response)
      if (!course || course.length === 0) {
        return res.render("courses/show", { course: [] });
      }
      // 4. Render thành công
      return res.render("courses/show", { course });
    } catch (error) {
      // 5. Khối catch duy nhất quản lý toàn bộ lỗi hệ thống
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
      res.redirect("/me/");
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
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
   // [Patch] /courses/:id/restore?_method=Patch
  restore(req, res, next) {
     Course.restore({ _id: req.params.id , deleted:true })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /courses/:id/force
  force(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new CourseController();
