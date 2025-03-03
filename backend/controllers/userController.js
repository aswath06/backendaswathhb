const connection = require("../config/connectDatabase");

// Get all users
exports.getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, users: results });
  });
};

// Get single user by ID
exports.getSingleUser = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user: results[0] });
  });
};

// Add a new user
exports.createUser = (req, res) => {
  const { name, role, password, advance, license_no, aadhaar_number, phone_number, address,vechile_number,image_url } = req.body;
  const sql = "INSERT INTO users (name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechilenumber,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";

  connection.query(sql, [name, role, password, advance, license_no, aadhaar_number, phone_number, address, vechile_number, image_url], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "User added successfully", userId: result.insertId });
  });
};
