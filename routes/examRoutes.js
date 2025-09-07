const express = require("express");
const router = express.Router();
const { createExam, getExams, updateExam, deleteExam } = require("../controller/examController");
const isAdmin = require("../middleware/isAdmin");
const authenticateJWT = require("../middleware/secureRoute"); 

router.post("/", authenticateJWT, isAdmin, createExam);
router.put("/:id", authenticateJWT, isAdmin, updateExam);
router.delete("/:id", authenticateJWT, isAdmin, deleteExam);
router.get("/", authenticateJWT, getExams);

module.exports = router;
