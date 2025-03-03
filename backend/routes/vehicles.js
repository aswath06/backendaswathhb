const express = require("express");
const router = express.Router();
const { getVehicles, getSingleVehicle, insertVehicle } = require("../controllers/vehicleControllers");

router.get("/vehicles", getVehicles);
router.get("/vehicle/:id", getSingleVehicle);
router.post("/vehicle", insertVehicle); // ✅ Ensure this line exists

module.exports = router;
