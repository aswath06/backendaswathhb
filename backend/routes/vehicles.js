const express = require("express");
const router = express.Router();
const { getVehicles, getSingleVehicle, insertVehicle } = require("../controllers/vehicleControllers");

router.get("/", getVehicles);
router.get("/:id", getSingleVehicle);
router.post("/", insertVehicle);

module.exports = router;
