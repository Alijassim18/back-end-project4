const ExamSubmission = require("../models/examsub");
const Exam = require("../models/exam");


async function submitExam(req, res) {
  try {
    const studentId = req.user.id;
    const { examId, answers } = req.body;

    if (!examId) return res.status(400).json({ message: "Exam ID is required" });

    const existing = await ExamSubmission.findOne({ exam: examId, student: studentId });
    if (existing) return res.status(400).json({ message: "You have already submitted this exam" });

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    let totalScore = 0;
    const processedAnswers = answers.map((ans) => {
      const question = exam.questions.id(ans.question);
      if (!question) return null;
      const pointEarned = question.answer === ans.answer ? question.point : 0;
      totalScore += pointEarned;
      return { question: ans.question, answer: ans.answer, pointEarned };
    }).filter(Boolean);

    const submission = await ExamSubmission.create({
      exam: examId,
      student: studentId,
      answers: processedAnswers,
      totalScore,
    });

    res.status(201).json({ totalScore, submission });
  } catch (err) {
    console.error("Error submitting exam:", err);
    res.status(500).json({ error: err.message });
  }
}


async function getStudentSubmissions(req, res) {
  try {
    const studentId = req.user.id;

  
    const submissions = await ExamSubmission.find({ student: studentId }).select("exam totalScore");

    
    const simpleSubs = submissions.map((sub) => ({
      _id: sub._id,
      exam: sub.exam.toString(),  
      totalScore: sub.totalScore
    }));

    res.status(200).json(simpleSubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
  async function getSubmissionById(req, res){
  try {
    const submissionId = req.params.id;
    const studentId = req.user.id;

    const submission = await ExamSubmission.findOne({ _id: submissionId, student: studentId });

    if (!submission) return res.status(404).json({ message: "Submission not found" });

    res.status(200).json(submission);
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).json({ error: err.message });
  }
}


module.exports = { submitExam, getStudentSubmissions ,getSubmissionById};
