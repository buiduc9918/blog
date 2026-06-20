const Course = require('../model/Course');



class SiteController {
    // [GET] /
    async index(req, res) {
        try {
         const filter = {};
            const courses = await Course.find(filter);
            console.log('Course filter:', filter, 'resultCount:', courses.length);
            res.json(courses);
        } catch (error) {
            res.status(400).json({ message: 'Error retrieving courses', error: error.message });
        }

    }
    // [GET] /search
    search(req, res) {
        console.log(req.query.q);
        res.render('search');
    }
}

module.exports = new SiteController();
