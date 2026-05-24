export const generateAssignmentQuestions =
  async () => {

    return JSON.stringify({
      title: "Cyber Security Assessment",

      sections: [
        {
          title: "Basics",

          instruction:
            "Answer all questions.",

          questions: [
            {
              question:
                "What is phishing?",

              difficulty: "Easy",

              marks: 5,
            },

            {
              question:
                "Explain SQL Injection.",

              difficulty: "Medium",

              marks: 10,
            },

            {
              question:
                "How does XSS work?",

              difficulty: "Hard",

              marks: 15,
            },
          ],
        },
      ],
    });
};