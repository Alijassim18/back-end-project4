const express = require("express");
const router = express.Router();
const { submitExam, getStudentSubmissions , getSubmissionById} = require("../controller/subm");
const secureRoute = require("../middleware/secureRoute");

router.post("/submit", secureRoute, submitExam);
router.get("/submissions", secureRoute, getStudentSubmissions);
router.get("/submission/:id", secureRoute, getSubmissionById);

module.exports = router;
