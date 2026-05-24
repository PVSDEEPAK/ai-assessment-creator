import { Request, Response } from "express";

import Assignment
  from "../models/Assignment";

import {
  generateAssignmentQuestions,
} from "../services/openai.service";

import fs from "fs";

const pdfParse =
  require("pdf-parse");

export const createAssignment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      let extractedText = "";

      if (req.file) {

        const dataBuffer =
          fs.readFileSync(
            req.file.path
          );

        const pdfData =
          await pdfParse(
            dataBuffer
          );

        extractedText =
          pdfData.text;
      }

      const aiResponse =
        await generateAssignmentQuestions();

      const cleanedResponse =
        aiResponse
          ?.replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      const parsedResponse =
        JSON.parse(
          cleanedResponse!
        );

      const assignment =
        await Assignment.create({

          title:
            parsedResponse.title,

          sections:
            parsedResponse.sections,

          dueDate:
            req.body.dueDate,

          instructions:
            req.body.instructions,
        });

      res.status(201).json({
        success: true,
        assignment,
      });

    } catch (error: any) {

      console.log(
        "ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const getAssignments =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const assignments =
        await Assignment.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        assignments,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const getAssignmentById =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        assignment,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const deleteAssignment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      await Assignment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Assignment deleted",
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};