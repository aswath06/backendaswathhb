const pool = require("../config/connectDatabase");

// ✅ Get all users
exports.getUsers = async (req, res) => {
  try {
    console.log("📡 API Called: GET /users");
    const result = await pool.query("SELECT * FROM users");

    console.log("✅ Query Result:", result.rows);
    res.json({ success: true, users: result.rows });
  } catch (err) {
    console.error("❌ Error in getUsers:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get single user by ID
exports.getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`📡 API Called: GET /users/${userId}`);

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      console.warn("⚠️ User not found:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ User Found:", result.rows[0]);
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("❌ Error in getSingleUser:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Add a new user
exports.createUser = async (req, res) => {
  try {
    console.log("📡 API Called: POST /users");
    const { name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image_url } = req.body;

    // 🚨 Validate Required Fields
    if (!name || !role || !password || !phone_number) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const sql = `INSERT INTO users (name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;

    const result = await pool.query(sql, [name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image_url]);

    console.log("✅ User Created:", result.rows[0].id);
    res.status(201).json({ success: true, message: "User added successfully", userId: result.rows[0].id });
  } catch (err) {
    console.error("❌ Error in createUser:", err);
    res.status(500).json({ success: false, error: err.stack || "Unknown error" });
  }
};
