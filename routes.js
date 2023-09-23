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
    calculateTeleportation,
} = require("./controllers/teleportationController");
const { calculateParking } = require("./controllers/parkingController");

router.post("/square", calculateSquare);
router.post("/digital-colony", calculateDigitalColony);
router.post("/greedymonkey", calculateGreedyMonkey);
router.post("/teleportation", calculateTeleportation);
router.post("/parking-lot", calculateParking);

module.exports = router;
