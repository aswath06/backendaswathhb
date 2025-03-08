const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getUsers);

// Get user by ID
router.get("/:id", userController.getSingleUser);

// Add a new user
router.post("/", userController.createUser);

module.exports = router;
//hello
