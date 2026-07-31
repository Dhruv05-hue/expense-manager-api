import {
  FaEdit,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";

const categoryColors = {
  Food: "bg-red-100 text-red-600",
  Travel: "bg-blue-100 text-blue-600",
  Shopping: "bg-purple-100 text-purple-600",
  Entertainment: "bg-pink-100 text-pink-600",
  Bills: "bg-orange-100 text-orange-600",
  Health: "bg-green-100 text-green-600",
  Education: "bg-indigo-100 text-indigo-600",
  Salary: "bg-emerald-100 text-emerald-600",
  Other: "bg-gray-100 text-gray-600",
};

export default function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}) {
  const badge =
    categoryColors[expense.category] ||
    categoryColors.Other;

  return (
    <tr className="group border-b border-gray-100 transition-all duration-300 hover:bg-blue-50/40">
      {/* Name */}
      <td className="px-6 py-5">
        <div>
          <h3 className="font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
            {expense.name}
          </h3>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
        >
          {expense.category}
        </span>
      </td>

      {/* Description */}
      <td className="max-w-xs px-6 py-5">
        {expense.description ? (
          <p
            title={expense.description}
            className="truncate text-sm text-gray-600"
          >
            {expense.description}
          </p>
        ) : (
          <span className="italic text-gray-400">
            No description
          </span>
        )}
      </td>

      {/* Amount */}
      <td className="px-6 py-5">
        <span className="rounded-xl bg-red-50 px-3 py-2 font-bold text-red-600">
          ₹ {Number(expense.amount).toLocaleString("en-IN")}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-5">
        <div>
          <p className="font-medium text-gray-700">
            {new Date(expense.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {new Date(expense.createdAt).toLocaleTimeString(
              "en-IN",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
          <button
            onClick={() =>
              expense.receipt &&
              window.open(expense.receipt, "_blank")
            }
            disabled={!expense.receipt}
            title={
              expense.receipt
                ? "View Receipt"
                : "No Receipt"
            }
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              expense.receipt
                ? "bg-green-100 text-green-600 hover:scale-110 hover:bg-green-200"
                : "cursor-not-allowed bg-gray-100 text-gray-300"
            }`}
          >
            <FaFileAlt />
          </button>

          <button
            onClick={() => onEdit(expense)}
            title="Edit"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all hover:scale-110 hover:bg-blue-200"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(expense)}
            title="Delete"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all hover:scale-110 hover:bg-red-200"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}