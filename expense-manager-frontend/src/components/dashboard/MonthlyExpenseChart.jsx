import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SectionCard from "../ui/SectionCard";

export default function MonthlyExpenseChart({ data }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    data?.map((item) => ({
      month: months[item.month - 1],
      amount: item.totalAmount,
    })) || [];

  return (
    <SectionCard
      title="Monthly Expense Chart"
      subtitle="Monthly spending overview"
    >
      {chartData.length === 0 ? (
        <div className="flex h-72 sm:h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 19h16M7 16V8m5 8V5m5 11v-6" />
            </svg>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-700">
            No expense data
          </h3>

          <p className="mt-2 text-center text-sm text-gray-500">
            Add some expenses to view your monthly spending chart.
          </p>
        </div>
      ) : (
        <div className="h-72 sm:h-80 lg:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 15,
                right: 15,
                left: -20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#3B82F6"
                  />
                  <stop
                    offset="100%"
                    stopColor="#1D4ED8"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#6B7280",
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#6B7280",
                }}
                tickFormatter={(value) =>
                  `₹${value >= 1000 ? `${value / 1000}k` : value}`
                }
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  `₹ ${Number(value).toLocaleString("en-IN")}`,
                  "Amount",
                ]}
                cursor={{
                  fill: "#EFF6FF",
                }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                }}
                labelStyle={{
                  fontWeight: 600,
                }}
              />

              <Bar
                dataKey="amount"
                fill="url(#expenseGradient)"
                radius={[12, 12, 0, 0]}
                maxBarSize={42}
                animationBegin={100}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
}