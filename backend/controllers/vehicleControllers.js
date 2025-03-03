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

// Get a single vehicle by ID
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

// Insert a new vehicle
exports.insertVehicle = (req, res) => {
  const {
    vechilenumber,
    fc,
    insurance,
    driver,
    pollution,  // Fixed typo from `pollucation`
    oil_service,
    category,
    totalkm,
    image_url
  } = req.body;

  // Validate input
  if (!vechilenumber || !fc || !insurance || !driver || !pollution || !oil_service || !category || !totalkm || !image_url) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = `INSERT INTO vehicles 
    (vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  connection.query(
    sql,
    [vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url],
    (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(201).json({ success: true, message: "Vehicle added successfully", vehicleId: results.insertId });
    }
  );
};
