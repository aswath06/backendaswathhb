const express = require("express");
const router = express.Router();
const { getVehicles, getSingleVehicle } = require("../controllers/vehicleControllers");

router.get("/vehicles", getVehicles);
router.get("/vehicle/:id", getSingleVehicle);

module.exports = router;
