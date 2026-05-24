import "dotenv/config";

import OpenAI from "openai";

console.log(
  "OPENROUTER KEY:",
  process.env.OPENROUTER_API_KEY
);

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

    try {

      const completion =
        await client.chat.completions.create({

          model:
            "mistralai/mistral-7b-instruct:free",

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
- Do not add markdown
- Do not add explanation text

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

          temperature: 0.7,

          max_tokens: 2000,
        });

      return (
        completion.choices[0]
          .message.content || ""
      );

    } catch (error: any) {

      console.log(
        "OPENROUTER ERROR:",
        error.message
      );

      throw new Error(
        error.message
      );
    }
};