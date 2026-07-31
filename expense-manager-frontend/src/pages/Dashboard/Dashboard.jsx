import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboard } from "../../services/expenseService";
import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentExpenses from "../../components/dashboard/RecentExpenses";
import MonthlyExpenseChart from "../../components/dashboard/MonthlyExpenseChart";
import CategoryPieChart from "../../components/dashboard/CategoryPieChart";
import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboard();

      setDashboardData(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-red-600">
              Something went wrong
            </h2>

            <p className="mt-2 text-gray-600">
              {error}
            </p>

            <button
              onClick={fetchDashboard}
              className="mt-6 rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Here's an overview of your expenses.
          </p>
        </div>

        {/* Statistics */}
        <SummaryCards
          statistics={dashboardData?.statistics}
        />

        {/* Monthly Chart */}
        <MonthlyExpenseChart
          data={dashboardData?.monthlyExpenses}
        />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <RecentExpenses
            expenses={dashboardData?.latestExpenses}
          />

          <CategoryPieChart
            data={dashboardData?.categoryExpenses}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}