const express = require("express");
const router = express.Router();
const { calculateSquare } = require("./controllers/squareController.js");
const {
    calculateDigitalColony,
} = require("./controllers/digitalColonyController");
const {
    calculateGreedyMonkey,
} = require("./controllers/greedyMonkeyController");
const {
    calculateCalendarScheduling,
} = require("./controllers/calendarScheduleController");

router.post("/square", calculateSquare);
router.post("/digital-colony", calculateDigitalColony);
router.post("/greedymonkey", calculateGreedyMonkey);
router.post("/calendar-scheduling", calculateCalendarScheduling);

module.exports = router;
