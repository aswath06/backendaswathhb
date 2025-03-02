const connection = require("../config/connectDatabase");

// Get all vehicles
exports.getVehicles = (req, res) => {
  const sql = "SELECT * FROM vehicles";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, vehicles: results });
  });
};

// Get single vehicle by ID
exports.getSingleVehicle = (req, res) => {
  const vehicleId = req.params.id;
  const sql = "SELECT * FROM vehicles WHERE id = ?";

  connection.query(sql, [vehicleId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }
    res.json({ success: true, vehicle: results[0] });
  });
};
