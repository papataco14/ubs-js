const express = require("express");
const router = express.Router();
const { calculateSquare } = require("./controllers/squareController.js");
const {
    calculateDigitalColony,
} = require("./controllers/digitalColonyController");
const {
    calculateGreedyMonkey,
} = require("./controllers/greedyMonkeyController");

router.post("/square", calculateSquare);
router.post("/digital-colony", calculateDigitalColony);
router.post("/greedymonkey", calculateGreedyMonkey);

module.exports = router;
