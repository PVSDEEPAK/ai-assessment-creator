"use client";

import jsPDF from "jspdf";

interface GeneratedPaperProps {
  assignment: any;
}

export default function GeneratedPaper({
  assignment,
}: GeneratedPaperProps) {

  const downloadPDF = () => {
    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(20);

    pdf.text(
      assignment.title,
      20,
      y
    );

    y += 12;

    pdf.setFontSize(12);

    pdf.text(
      "Time Allowed: 45 Minutes",
      20,
      y
    );

    y += 8;

    pdf.text(
      "Maximum Marks: 20",
      20,
      y
    );

    y += 15;

    assignment.sections.forEach(
      (
        section: any,
        sectionIndex: number
      ) => {

        pdf.setFontSize(16);

        pdf.text(
          section.title,
          20,
          y
        );

        y += 8;

        pdf.setFontSize(11);

        pdf.text(
          section.instruction,
          20,
          y
        );

        y += 10;

        section.questions.forEach(
          (
            question: any,
            qIndex: number
          ) => {

            const questionText =
              `Q${qIndex + 1}. ${question.question}`;

            const splitText =
              pdf.splitTextToSize(
                questionText,
                170
              );

            pdf.text(
              splitText,
              20,
              y
            );

            y +=
              splitText.length * 7;

            pdf.text(
              `${question.marks} Marks | ${question.difficulty}`,
              20,
              y
            );

            y += 12;

            if (y > 270) {
              pdf.addPage();

              y = 20;
            }
          }
        );

        y += 10;
      }
    );

    pdf.save("assignment.pdf");
  };

  const getDifficultyColor = (
    difficulty: string
  ) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Hard":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm mt-8 overflow-hidden">
      <div className="border-b px-10 py-8 text-center bg-white">
        <h1 className="text-4xl font-bold text-gray-900">
          {assignment.title}
        </h1>

        <div className="flex justify-center gap-10 mt-4 text-gray-600">
          <p>Time Allowed: 45 Minutes</p>

          <p>Maximum Marks: 20</p>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-b pb-2">
            Name:
          </div>

          <div className="border-b pb-2">
            Roll Number:
          </div>

          <div className="border-b pb-2">
            Section:
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {assignment.sections.map(
            (
              section: any,
              sectionIndex: number
            ) => (
              <div key={sectionIndex}>
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">
                    {section.title}
                  </h2>

                  <div className="h-[2px] flex-1 bg-gray-200 ml-6" />
                </div>

                <p className="text-gray-500 mt-2">
                  {section.instruction}
                </p>

                <div className="mt-8 space-y-5">
                  {section.questions.map(
                    (
                      question: any,
                      qIndex: number
                    ) => (
                      <div
                        key={qIndex}
                        className="border rounded-2xl p-6"
                      >
                        <div className="flex justify-between items-start gap-6">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              Q{qIndex + 1}.{" "}
                              {question.question}
                            </h3>

                            <p className="mt-4 text-sm text-gray-500">
                              {question.marks} Marks
                            </p>
                          </div>

                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                              question.difficulty
                            )}`}
                          >
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex justify-end mt-12">
          <button
            onClick={downloadPDF}
            className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}