const pool = require("../config/connectDatabase");

exports.getVehicles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vehicles");
    res.json({ success: true, vehicles: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getSingleVehicle = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, vehicle: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.insertVehicle = async (req, res) => {
  try {
    const { vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url, duty } = req.body;

    if (!vechilenumber || !fc || !insurance || !driver || !pollution || !oil_service || !category || !totalkm || !image_url || !duty)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const sql = `
      INSERT INTO vehicles 
      (vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url, duty) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;

    const result = await pool.query(sql, [vechilenumber, fc, insurance, driver, pollution, oil_service, category, totalkm, image_url, duty]);

    res.status(201).json({ success: true, message: "Vehicle added successfully", vehicleId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
