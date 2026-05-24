import "dotenv/config";

console.log(
  "OPENROUTER KEY:",
  process.env.OPENROUTER_API_KEY
);

import OpenAI from "openai";

const client = new OpenAI({
  apiKey:
    process.env.OPENROUTER_API_KEY,

  baseURL:
    "https://openrouter.ai/api/v1",
});

export const generateAssignmentQuestions =
  async (
    extractedText?: string
  ) => {

    const completion =
      await client.chat.completions.create({
        model:
          "openai/gpt-3.5-turbo",

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