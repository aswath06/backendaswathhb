const express = require("express");
const router = express.Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../controllers/userController");

// ✅ Get all users
router.get("/", getUsers);

// ✅ Get user by ID
router.get("/:id", getSingleUser);

// ✅ Add a new user
router.post("/", createUser);

// ✅ Update user by ID
router.put("/:id", updateUser);

// ✅ Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;
