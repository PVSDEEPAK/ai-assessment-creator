"use client";

import { useEffect, useState }
  from "react";

import axios from "axios";

import { useParams }
  from "next/navigation";

import Navbar
  from "@/components/layout/Navbar";

export default function AssignmentDetailsPage() {

  const params = useParams();

  const [assignment, setAssignment] =
    useState<any>(null);

  useEffect(() => {

    const fetchAssignment =
      async () => {

        try {

          const response =
            await axios.get(
              `http://localhost:5000/api/assignments/${params.id}`
            );

          setAssignment(
            response.data.assignment
          );

        } catch (error) {

          console.log(error);
        }
      };

    if (params.id) {
      fetchAssignment();
    }

  }, [params.id]);

  if (!assignment) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <Navbar />

      <div className="bg-white rounded-3xl shadow-sm mt-8 overflow-hidden">

        <div className="border-b px-10 py-8 text-center">

          <h1 className="text-4xl font-bold">
            {assignment.title}
          </h1>

        </div>

        <div className="px-10 py-8">

          <div className="space-y-10">

            {assignment.sections.map(
              (
                section: any,
                sectionIndex: number
              ) => (

                <div key={sectionIndex}>

                  <h2 className="text-2xl font-bold">
                    {section.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {section.instruction}
                  </p>

                  <div className="mt-6 space-y-5">

                    {section.questions.map(
                      (
                        question: any,
                        qIndex: number
                      ) => (

                        <div
                          key={qIndex}
                          className="border rounded-2xl p-6"
                        >

                          <h3 className="font-semibold text-lg">
                            Q{qIndex + 1}.{" "}
                            {
                              question.question
                            }
                          </h3>

                          <p className="text-sm text-gray-500 mt-3">
                            {question.marks} Marks
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}