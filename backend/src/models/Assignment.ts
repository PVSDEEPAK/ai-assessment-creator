import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  difficulty: String,
  marks: Number,
});

const SectionSchema = new mongoose.Schema({
  title: String,
  instruction: String,
  questions: [QuestionSchema],
});

const AssignmentSchema = new mongoose.Schema(
  {
    title: String,

    dueDate: String,

    instructions: String,

    sections: [SectionSchema],

    status: {
      type: String,
      default: "generated",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Assignment",
  AssignmentSchema
);