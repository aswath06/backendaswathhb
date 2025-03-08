const pool = require("../config/connectDatabase");

// ✅ Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    console.log("📡 API Called: GET /vehicles");
    const result = await pool.query("SELECT * FROM vehicles");
    res.json({ success: true, vehicles: result.rows });
  } catch (err) {
    console.error("❌ Error in getVehicles:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get single vehicle by ID
exports.getSingleVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [vehicleId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.json({ success: true, vehicle: result.rows[0] });
  } catch (err) {
    console.error("❌ Error in getSingleVehicle:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Insert a new vehicle
exports.insertVehicle = async (req, res) => {
  try {
    console.log("📡 API Called: POST /vehicles");
    const { vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url } = req.body;

    if (!vechilenumber || !fc || !insurance || !driver || !pollution || !oil_service || !category || !totalkm || !image_url) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const sql = `INSERT INTO vehicles (vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;

    const result = await pool.query(sql, [vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url]);

    res.status(201).json({ success: true, message: "Vehicle added successfully", vehicleId: result.rows[0].id });
  } catch (err) {
    console.error("❌ Error in insertVehicle:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
