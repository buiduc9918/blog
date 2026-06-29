const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
router.post('/handle-form-action',courseController.handleFormAction);

router.get('/creat', courseController.creat);

router.put('/:id', courseController.update);
router.delete('/:id/delete', courseController.destroy);
router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.get('/:slug', courseController.show);
router.delete('/:id/force', courseController.force);

router.get('/', courseController.show);


module.exports = router;
