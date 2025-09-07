const express = require("express");
const router = express.Router();

// Correct import using destructuring
const { login } = require("../controller/auth");

// Login route
router.post("/login", login);

module.exports = router;
