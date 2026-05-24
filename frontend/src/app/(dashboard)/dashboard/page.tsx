"use client";

import { useEffect, useState }
  from "react";

import axios from "axios";

import Navbar
  from "@/components/layout/Navbar";

export default function AssignmentsPage() {

  const [assignments, setAssignments] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchAssignments =
      async () => {

        try {

          const response =
            await axios.get(
              "https://ai-assessment-backend-s6lw.onrender.com/api/assignments"
            );

          setAssignments(
            response.data.assignments
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchAssignments();

  }, []);

  return (
    <div className="p-8">

      <Navbar />

      {/* Header */}

      <div className="mt-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Assignments
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage generated papers.
          </p>

        </div>

        <input
          placeholder="Search assignments..."
          className="border rounded-2xl px-5 py-3 w-[320px] outline-none bg-white"
        />

      </div>

      {/* Assignments Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

        {assignments.map(
          (assignment: any) => (

            <div
              key={assignment._id}
              className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {assignment.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    {
                      new Date(
                        assignment.createdAt
                      ).toLocaleDateString()
                    }
                  </p>

                </div>

                <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  AI
                </div>

              </div>

              <p className="text-gray-500 mt-4 line-clamp-3">
                {assignment.instructions}
              </p>

              <div className="flex gap-3 mt-8">

                <button className="flex-1 bg-black text-white py-3 rounded-2xl hover:opacity-90 transition">
                  Open
                </button>

                <button className="px-5 py-3 border rounded-2xl hover:bg-gray-100 transition">
                  Delete
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}