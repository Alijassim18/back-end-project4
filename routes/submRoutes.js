const express = require("express");
const router = express.Router();
const { submitExam } = require("../controller/subm");
const authenticateJWT = require("../middleware/secureRoute"); 
const isStudent = require("../middleware/isStudent");

router.post("/", authenticateJWT, isStudent, submitExam);

module.exports = router;
