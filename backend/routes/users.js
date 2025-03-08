const express = require("express");
const router = express.Router();
const { getUsers, getSingleUser, createUser } = require("../controllers/userController");

// ✅ Get all users
router.get("/", getUsers);

// ✅ Get user by ID
router.get("/:id", getSingleUser);

// ✅ Add a new user
router.post("/", createUser);

module.exports = router;
