"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAssignmentQuestions = void 0;
require("dotenv/config");
console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY);
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});
const generateAssignmentQuestions = async (extractedText) => {
    const completion = await client.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `
You are an AI teacher assistant.

Analyze the uploaded study material
and generate a proper assessment.

IMPORTANT:
- Detect subject automatically
- Detect topic automatically
- Generate relevant questions ONLY from uploaded content
- Create proper sections
- Use varying difficulty levels
- Return ONLY valid JSON

JSON FORMAT:

{
  "title": "",
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "question": "",
          "difficulty": "",
          "marks": 0
        }
      ]
    }
  ]
}

Uploaded Content:
${extractedText}
`,
            },
        ],
    });
    return completion
        .choices[0]
        .message.content || "";
};
exports.generateAssignmentQuestions = generateAssignmentQuestions;
