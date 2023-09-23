const express = require('express');
const router = express.Router();
const { calculateSquare } = require('./controllers/squareController.js');
const { calculateDigitalColony } = require('../controllers/digitalColonyController');


router.post('/square', calculateSquare);
router.post('/digital-colony', calculateDigitalColony);

module.exports = router;
