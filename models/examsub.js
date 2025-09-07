const mongoose = require("mongoose");

const ExamSubmissionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: { type: String, required: true },
      pointEarned: { type: Number, default: 0 },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
  totalScore: { type: Number, default: 0 },
});

const ExamSubmission = model("Submission", ExamSubmissionSchema);

module.exports =ExamSubmission