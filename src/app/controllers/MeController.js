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
    let courses = Course.find({ deleted: false });

    if (req.query.hasOwnProperty("_sort")) {
      // 1. Fix typo in variable name & ensure type is always lowercase for comparison
      const isValidType = ["asc", "desc"].includes(
        req.query.type?.toLowerCase(),
      );

      // 2. Fallback to 'desc' if the provided type is invalid or missing
      const sortOrder = isValidType ? req.query.type : "desc";

      // 3. Apply the sort to your Mongoose query
      courses = courses.sort({
        [req.query.column]: sortOrder,
      });
    }
    Promise.all([courses, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render("me/stored", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [GET] /me/trash/courses
  trash(req, res, next) {
    Promise.all([
      Course.findDeleted({}).lean(), // Thêm {} vào đây để an toàn
      Course.countDocuments({ deleted: false }), // Đếm các bản ghi chưa xóa
    ])
      .then(([courses, documentsnodeleted]) => {
        console.log("Số lượng chưa xóa:", documentsnodeleted);
        return res.render("me/trash", {
          courses,
          documentsnodeleted,
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
