const express = require("express");
const router = express.Router();
const { createExam, getExams, updateExam, deleteExam ,showExam} = require("../controller/exam");


router.post("/new",  createExam);
router.put("/:id", updateExam);
router.delete("/:id",  deleteExam);
router.get("/",  getExams);
router.get("/:id",  showExam);

module.exports = router;
