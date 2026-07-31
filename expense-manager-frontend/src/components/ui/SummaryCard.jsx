export default function SummaryCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      <div className="flex items-start justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className={`text-3xl font-bold ${theme.text}`}>
            {value}
          </h2>

        </div>

        <div
          className={`
            ${theme.bg}
            ${theme.text}
            p-4
            rounded-2xl
            text-2xl
            shadow-sm
            group-hover:scale-110
            transition-transform
            duration-300
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}