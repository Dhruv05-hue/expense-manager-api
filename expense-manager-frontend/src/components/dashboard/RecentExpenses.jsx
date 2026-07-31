export default function RecentExpenses({ expenses }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Recent Expenses
      </h2>

      {expenses?.length === 0 ? (
        <p className="text-gray-500">
          No expenses found.
        </p>
      ) : (
        <div className="space-y-3">

          {expenses?.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <h3 className="font-medium">
                  {expense.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {expense.category}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(
                    expense.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <p className="font-bold text-red-600">
                ₹ {expense.amount}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}