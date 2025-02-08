const express = require('express');
const router = express.Router();
const streetsController = require('../controllers/streetsController');

router.get('/', streetsController.getAllStreets);

module.exports = router;