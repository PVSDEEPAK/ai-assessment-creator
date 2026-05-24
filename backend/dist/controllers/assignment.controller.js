"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.getAssignmentById = exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = __importDefault(require("../models/Assignment"));
const openai_service_1 = require("../services/openai.service");
const fs_1 = __importDefault(require("fs"));
const pdfParse = require("pdf-parse");
const createAssignment = async (req, res) => {
    let extractedText = "";
    try {
        if (req.file) {
            const dataBuffer = fs_1.default.readFileSync(req.file.path);
            const pdfData = await pdfParse(dataBuffer);
            extractedText =
                pdfData.text;
        }
        const aiResponse = await (0, openai_service_1.generateAssignmentQuestions)(extractedText);
        const cleanedResponse = aiResponse
            ?.replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const parsedResponse = JSON.parse(cleanedResponse);
        const assignment = await Assignment_1.default.create({
            title: parsedResponse.title,
            sections: parsedResponse.sections,
            dueDate: req.body.dueDate,
            instructions: req.body.instructions,
        });
        res.status(201).json({
            success: true,
            assignment,
        });
    }
    catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment_1.default.find()
            .sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            assignments,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.findById(req.params.id);
        res.status(200).json({
            success: true,
            assignment,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAssignmentById = getAssignmentById;
const deleteAssignment = async (req, res) => {
    try {
        await Assignment_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Assignment deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteAssignment = deleteAssignment;
