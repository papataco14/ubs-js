const express = require('express');
const router = express.Router();

const squareRoutes = require('./square.js');

router.use('/square', squareRoutes);

module.exports = router;
