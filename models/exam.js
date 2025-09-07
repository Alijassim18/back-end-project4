const mongoose = require("mongoose")

const ExamSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   } ,
   startDate: { type: Date, required: true },
   endDate: { type: Date, required: true },
 questions: [ {questionType: { 
    type: String, 
    enum: ["mcq", "true_false", "text"], 
    required: true 
  },
   text: { type: String, required: true },
    answer: { type: String, required:true },
    point:{type:Number ,required: true}
}],
timer:{type:number ,required:true}, 
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}
)




const Exam= modle('exam',ExamSchema);

module.exports=Exam;