const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('', meController.stored);

module.exports = router;
