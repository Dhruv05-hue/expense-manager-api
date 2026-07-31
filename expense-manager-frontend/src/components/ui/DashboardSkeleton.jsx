export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-9 w-52 rounded-xl bg-gray-200" />
        <div className="mt-3 h-4 w-80 max-w-full rounded-lg bg-gray-100" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4 lg:gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 w-28 rounded bg-gray-200" />

                <div className="mt-5 h-9 w-24 rounded bg-gray-300" />
              </div>

              <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Chart */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="h-6 w-52 rounded bg-gray-200" />

          <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
        </div>

        <div className="p-5 sm:p-6">
          <div className="h-[360px] rounded-2xl bg-gray-100" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="h-6 w-48 rounded bg-gray-200" />

              <div className="mt-2 h-4 w-36 rounded bg-gray-100" />
            </div>

            <div className="p-5 sm:p-6">
              <div className="h-[360px] rounded-2xl bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}