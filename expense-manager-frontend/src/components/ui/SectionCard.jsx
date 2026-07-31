export default function SectionCard({
  title,
  subtitle,
  children,
  action,
  className = "",
}) {
  return (
    <section
      className={`
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        ${className}
      `}
    >
      {(title || subtitle || action) && (
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0">
            {title && (
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}