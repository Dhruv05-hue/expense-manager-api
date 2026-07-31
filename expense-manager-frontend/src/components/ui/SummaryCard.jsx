import CountUp from "react-countup";

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
      ring: "group-hover:ring-blue-200",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      ring: "group-hover:ring-red-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      ring: "group-hover:ring-green-200",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      ring: "group-hover:ring-orange-200",
    },
  };

  const theme = colors[color] || colors.blue;
  const Icon = icon;

  const isCurrency =
    typeof value === "string" && value.trim().startsWith("₹");

  const numericValue = Number(
    String(value).replace(/[₹,\s]/g, "")
  );

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-5
        sm:p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* Background Decoration */}
      <div
        className="
          absolute
          -right-8
          -top-8
          h-28
          w-28
          rounded-full
          bg-gray-100/60
          transition-transform
          duration-500
          group-hover:scale-125
        "
      />

      <div className="relative flex items-start justify-between gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            {title}
          </p>

          <h2
            className={`
              mt-2
              break-words
              text-2xl
              font-bold
              sm:text-3xl
              ${theme.text}
            `}
          >
            {isNaN(numericValue) ? (
              value
            ) : (
              <>
  {isCurrency && "₹ "}
  {numericValue.toLocaleString("en-IN")}
</>
            )}
          </h2>
        </div>

        {/* Right */}
        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${theme.bg}
            ${theme.text}
            ring-0
            ${theme.ring}
            shadow-sm
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-6
            group-hover:ring-4
            text-xl
            sm:h-16
            sm:w-16
            sm:text-2xl
          `}
        >
          <Icon />
        </div>
      </div>

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-1
          w-0
          ${theme.bg}
          transition-all
          duration-500
          group-hover:w-full
        `}
      />
    </div>
  );
}