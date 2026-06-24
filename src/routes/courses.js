const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
router.get('/creat', courseController.creat);
router.get('/:slug', courseController.show);
router.get('/', courseController.show);


module.exports = router;
