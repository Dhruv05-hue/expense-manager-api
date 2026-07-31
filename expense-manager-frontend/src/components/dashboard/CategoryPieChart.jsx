import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
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

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Category Breakdown
      </h2>

      {chartData.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-500">
          No expense data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`₹ ${value}`, "Amount"]}
            />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}