const express = require("express");
const router = express.Router();
const { getUsers, getSingleUser, createUser } = require("../controllers/userController");

router.get("/users", getUsers);
router.get("/user/:id", getSingleUser);
router.post("/user", createUser);

module.exports = router;
