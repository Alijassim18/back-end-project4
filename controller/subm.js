const ExamSubmission = require("../models/examsub");

async function submitExam(req, res) {
  try {
    const submissionData = {
      ...req.body,
      student: req.user._id, 
    };

    const submission = await ExamSubmission.create(submissionData);
    res.status(201).json(submission);
  } catch (err) {
    console.error("Error submitting exam:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { submitExam };