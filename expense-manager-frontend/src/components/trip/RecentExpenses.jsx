import { Pencil, Trash2 } from "lucide-react";

export default function RecentExpenses({
  expenses,
  onEdit,
  onDelete,
}) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        No recent expenses found.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 hover:bg-gray-50 transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800">
              {expense.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {expense.category}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(expense.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">
                ₹{Number(expense.amount).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => onEdit(expense)}
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 transition"
              title="Edit Expense"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(expense)}
              className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
              title="Delete Expense"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}