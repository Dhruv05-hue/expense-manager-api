import ExpenseRow from "./ExpenseRow";
import TableSkeleton from "../common/TableSkeleton";

export default function ExpenseTable({
  expenses,
  loading,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">

            <tr className="text-gray-600 text-sm uppercase tracking-wide">

              <th className="px-6 py-4 text-left font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                 Description
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Amount
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 ? (
              <tr>

                <td
                  colSpan="6"
                  className="py-16 text-center"
                >

                  <div className="flex flex-col items-center gap-3">

                    <div className="text-6xl">
                      💸
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                      No Expenses Found
                    </h3>

                    <p className="text-gray-500">
                      Add your first expense to get started.
                    </p>

                  </div>

                </td>

              </tr>
            ) : (
              expenses.map((expense) => (
                <ExpenseRow
                  key={expense._id}
                  expense={expense}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-gray-100 px-6 py-5">

        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
          <span className="font-semibold text-gray-800">
            {totalPages}
          </span>
        </p>

        <div className="flex gap-3">

          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-gray-200
              bg-white
              hover:bg-gray-50
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              hover:shadow-lg
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}