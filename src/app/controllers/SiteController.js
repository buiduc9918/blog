const Course = require('../model/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');


class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            const filter = {};
            const courses = multipleMongooseToObject(await Course.find(filter));
            console.log('Course filter:', filter, 'resultCount:', courses.length);
            res.render('home', { courses: courses });
        } catch (error) {
            next(error);
        }

    }
    // [GET] /search
    search(req, res, next) {
        console.log(req.query.q);
        res.render('search', { title: 'Search Results' });
    }
    
    // [POST] /store
    async store(req, res, next) {
        try {
            const { name, description, image } = req.body;
            const newCourse = new Course({
                name,
                description,
                image
            });
            await newCourse.save();
            console.log('Course created:', newCourse);
            res.json({ 
                success: true, 
                message: 'Tạo khóa học thành công',
                course: newCourse 
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SiteController();
