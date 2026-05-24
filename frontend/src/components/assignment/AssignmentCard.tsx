interface AssignmentCardProps {
  title: string;
  assignedDate: string;
  dueDate: string;
}

export default function AssignmentCard({
  title,
  assignedDate,
  dueDate,
}: AssignmentCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-black">
          {title}
        </h3>

        <button className="text-gray-400 text-xl">
          ⋮
        </button>
      </div>

      <div className="mt-8 flex justify-between text-sm text-gray-500">
        <p>
          Assigned on: {assignedDate}
        </p>

        <p>
          Due: {dueDate}
        </p>
      </div>
    </div>
  );
}