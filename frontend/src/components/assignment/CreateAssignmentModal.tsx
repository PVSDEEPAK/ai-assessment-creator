"use client";

import { useState } from "react";

import { createAssignment } from "@/services/assignment.service";

import GeneratedPaper from "./GeneratedPaper";

export default function CreateAssignmentModal() {

  const [loading, setLoading] =
    useState(false);

  const [assignment, setAssignment] =
    useState<any>(null);

  const [dueDate, setDueDate] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const handleGenerate = async () => {

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "dueDate",
        dueDate
      );

      formData.append(
        "instructions",
        instructions
      );

      if (file) {

        formData.append(
          "file",
          file
        );
      }

      const response =
        await createAssignment(
          formData
        );

      setAssignment(
        response.assignment
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (assignment) {

    return (
      <GeneratedPaper
        assignment={assignment}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm mt-6 max-w-4xl">

      <div>
        <h2 className="text-2xl font-bold">
          Create Assignment
        </h2>

        <p className="text-gray-500 mt-1">
          Set up your assignment.
        </p>
      </div>

      <div className="mt-8">
  <label className="font-semibold text-lg">
    Upload Study Material
  </label>

  <div className="mt-4 border-2 border-dashed border-gray-300 rounded-3xl p-10 bg-gray-50 hover:bg-gray-100 transition-all duration-300 text-center">

    <div className="flex flex-col items-center justify-center">

      <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl">
        ↑
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        Upload PDF Notes
      </h3>

      <p className="text-gray-500 mt-2">
        Drag & drop your study material
        or browse files
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {

          if (e.target.files?.[0]) {

            setFile(
              e.target.files[0]
            );
          }
        }}
        className="mt-6"
      />

      {file && (
        <div className="mt-6 bg-white border rounded-2xl px-5 py-3 shadow-sm">
          <p className="font-medium">
            {file.name}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            PDF uploaded successfully
          </p>
        </div>
      )}
    </div>
  </div>
</div>

      <div className="mt-6">

        <label className="font-semibold">
          Due Date
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              e.target.value
            )
          }
          className="mt-2 w-full border rounded-xl p-3 outline-none"
        />
      </div>

      <div className="mt-8">

        <label className="font-semibold">
          Additional Instructions
        </label>

        <textarea
          placeholder="Add instructions..."
          value={instructions}
          onChange={(e) =>
            setInstructions(
              e.target.value
            )
          }
          className="mt-2 w-full border rounded-2xl p-4 h-32 outline-none resize-none"
        />
      </div>

      <div className="flex justify-end mt-10">

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Assignment"}
        </button>

      </div>
    </div>
  );
}