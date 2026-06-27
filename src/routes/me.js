const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/news', meController.index);
router.get('/trash/courses', meController.trash);
router.get('', meController.stored);

module.exports = router;
