const Exam=require("../models/exam")
async function createExam(req, res) {
  try {
    const exam = await Exam.create({ ...req.body});
    res.status(201).json(exam);
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getExams(req, res) {
  try {
    const exams = await Exam.find().populate("createdBy", "Name email");
    res.status(200).json(exams);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ error: err.message });
  }
}

async function updateExam(req, res) {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(exam);
  } catch (err) {
    console.error("Error updating exam:", err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteExam(req, res) {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(500).json({ error: err.message });
  }
}

async function showExam(req, res){
    try {
        const pet = await Exam.findById(req.params.id)
        if (pet){
            res.status(200).json(pet)
        } else {
            res.sendStatus(404)
        }
        
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = { createExam, getExams, updateExam, deleteExam,showExam };