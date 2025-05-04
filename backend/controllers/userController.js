const pool = require("../config/connectDatabase");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name, role, password, phone_number, advance, license_no, aadhaar_number,
      address, vechile_number, image_url, working, no_of_days_present
    } = req.body;

    if (!name || !role || !password || !phone_number)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    const sql = `
      INSERT INTO users 
      (name, role, password, phone_number, advance, license_no, aadhaar_number, 
       address, vechile_number, image, working, no_of_days_present) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`;

    const result = await pool.query(sql, [
      name, role, password, phone_number, advance || 0, license_no || null,
      aadhaar_number || null, address || null, vechile_number || null, image_url || null,
      working || "free", no_of_days_present || 0
    ]);

    res.status(201).json({ success: true, message: "User added successfully", userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name, role, phone_number, advance, license_no, aadhaar_number, address,
      vechile_number, image_url, working, no_of_days_present
    } = req.body;

    const sql = `
      UPDATE users SET 
        name = COALESCE($1, name),
        role = COALESCE($2, role),
        phone_number = COALESCE($3, phone_number),
        advance = COALESCE($4, advance),
        license_no = COALESCE($5, license_no),
        aadhaar_number = COALESCE($6, aadhaar_number),
        address = COALESCE($7, address),
        vechile_number = COALESCE($8, vechile_number),
        image = COALESCE($9, image),
        working = COALESCE($10, working),
        no_of_days_present = COALESCE($11, no_of_days_present)
      WHERE id = $12 RETURNING *`;

    const result = await pool.query(sql, [
      name, role, phone_number, advance, license_no, aadhaar_number,
      address, vechile_number, image_url, working, no_of_days_present, userId
    ]);

    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
