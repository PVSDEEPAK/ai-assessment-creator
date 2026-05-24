"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionSchema = new mongoose_1.default.Schema({
    question: String,
    difficulty: String,
    marks: Number,
});
const SectionSchema = new mongoose_1.default.Schema({
    title: String,
    instruction: String,
    questions: [QuestionSchema],
});
const AssignmentSchema = new mongoose_1.default.Schema({
    title: String,
    dueDate: String,
    instructions: String,
    sections: [SectionSchema],
    status: {
        type: String,
        default: "generated",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Assignment", AssignmentSchema);
