import { FaReceipt } from "react-icons/fa";
import SectionCard from "../ui/SectionCard";

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

export default function RecentExpenses({ expenses }) {
  return (
    <SectionCard
      title="Recent Expenses"
      subtitle="Your latest expense activity"
    >
      {expenses?.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <FaReceipt className="text-3xl text-blue-600" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-700">
            No expenses yet
          </h3>

          <p className="mt-2 text-center text-sm text-gray-500">
            Start adding expenses to keep track of your spending.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <div
              key={expense._id}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              style={{
                animation: `fadeInUp 0.35s ease ${index * 80}ms both`,
              }}
            >
              {/* Left */}
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                  <FaReceipt />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-gray-800">
                    {expense.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        categoryColors[expense.category] ||
                        categoryColors.Other
                      }`}
                    >
                      {expense.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {new Date(expense.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="ml-4 shrink-0">
                <div className="rounded-xl bg-red-50 px-4 py-2 text-right">
                  <p className="text-xs text-gray-500">
                    Amount
                  </p>

                  <h3 className="text-lg font-bold text-red-600">
                    ₹ {Number(expense.amount).toLocaleString("en-IN")}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </SectionCard>
  );
}