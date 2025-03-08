const express = require("express");
const router = express.Router();
const { getVehicles, getSingleVehicle, insertVehicle } = require("../controllers/vehicleControllers");

// ✅ Get all vehicles
router.get("/", getVehicles);

// ✅ Get single vehicle by ID
router.get("/:id", getSingleVehicle);

// ✅ Insert a new vehicle
router.post("/", insertVehicle);

module.exports = router;
