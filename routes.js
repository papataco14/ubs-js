const express = require("express");
const router = express.Router();
const { calculateSquare } = require("./controllers/squareController.js");
const {
    calculateDigitalColony,
} = require("./controllers/digitalColonyController");
const {
    calculateGreedyMonkey,
} = require("./controllers/greedyMonkeyController");
const { calculateParking } = require("./controllers/parkingController");
const {
    prioritizeAndFilterPassengers,
} = require("./controllers/airportController");

router.post("/square", calculateSquare);
router.post("/digital-colony", calculateDigitalColony);
router.post("/greedymonkey", calculateGreedyMonkey);
router.post("/parking-lot", calculateParking);
router.post("/airport", prioritizeAndFilterPassengers);

module.exports = router;
