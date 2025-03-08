const pool = require("../config/connectDatabase");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single user by ID
exports.getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add a new user
exports.createUser = async (req, res) => {
  try {
    const { name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image_url } = req.body;
    const sql = `INSERT INTO users (name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechilenumber, image)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;

    const result = await pool.query(sql, [name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image_url]);

    res.json({ success: true, message: "User added successfully", userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
