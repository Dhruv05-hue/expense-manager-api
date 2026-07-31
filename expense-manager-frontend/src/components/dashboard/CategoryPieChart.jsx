import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie } from "react-icons/fa";
import SectionCard from "../ui/SectionCard";

const COLORS = [
  "#2563EB",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6B7280",
];

export default function CategoryPieChart({ data }) {
  const chartData =
    data?.map((item) => ({
      name: item.category,
      value: item.totalAmount,
    })) || [];

  const totalAmount = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <SectionCard
      title="Category Breakdown"
      subtitle="Spending distribution by category"
    >
      {chartData.length === 0 ? (
        <div className="flex h-72 sm:h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <FaChartPie className="text-3xl text-blue-600" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-700">
            No expense data
          </h3>

          <p className="mt-2 text-center text-sm text-gray-500">
            Add some expenses to see your category distribution.
          </p>
        </div>
      ) : (
        <div className="relative h-72 sm:h-80 lg:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="52%"
                outerRadius="78%"
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
                animationBegin={100}
                animationDuration={1400}
                animationEasing="ease-out"
                isAnimationActive
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `₹ ${Number(value).toLocaleString("en-IN")}`,
                  "Amount",
                ]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                }}
                labelStyle={{
                  fontWeight: 600,
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "18px",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Total
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                ₹ {totalAmount.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}