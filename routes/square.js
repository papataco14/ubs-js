const express = require('express');
const router = express.Router();
const { calculateSquare } = require('../controllers/squareController.js');

router.post('/', calculateSquare);

module.exports = router;
