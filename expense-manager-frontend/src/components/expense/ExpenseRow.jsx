import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";

export default function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">{expense.name}</td>

      <td className="p-4">{expense.category}</td>

      <td className="p-4 w-72">
        {expense.description ? (
      <p
        className="truncate text-gray-600"
        title={expense.description}
      >
      {expense.description}
      </p>
      ) : (
        <span className="text-gray-400 italic">
          No description
        </span>
      )}
</td>

      <td className="p-4 font-semibold">
        ₹{expense.amount}
      </td>

      <td className="p-4">
        {new Date(expense.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-4">

          {expense.receipt ? (
            <button
              onClick={() => window.open(expense.receipt, "_blank")}
              className="text-green-600 hover:text-green-800"
              title="View Receipt"
            >
              <FaFileAlt />
            </button>
          ) : (
            <button
              disabled
              className="text-gray-300 cursor-not-allowed"
              title="No Receipt"
            >
              <FaFileAlt />
            </button>
          )}

          <button
            onClick={() => onEdit(expense)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(expense)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
}