import Navbar from "@/components/layout/Navbar";

import CreateAssignmentModal
  from "@/components/assignment/CreateAssignmentModal";

export default function CreateAssignmentPage() {

  return (
    <div className="p-8">

      <Navbar />

      <div className="mt-8">

        <h1 className="text-4xl font-bold">
          Create Assignment
        </h1>

        <p className="text-gray-500 mt-2">
          Generate AI-powered assessments.
        </p>

      </div>

      <CreateAssignmentModal />

    </div>
  );
}