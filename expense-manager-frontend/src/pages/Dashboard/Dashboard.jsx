import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboard } from "../../services/expenseService";
import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentExpenses from "../../components/dashboard/RecentExpenses";
import MonthlyExpenseChart from "../../components/dashboard/MonthlyExpenseChart";
import CategoryPieChart from "../../components/dashboard/CategoryPieChart";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

 const fetchDashboard = async () => {
  try {
    const response = await getDashboard();

    console.log("Dashboard API Response:", response);

    setDashboardData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Heading */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Here's an overview of your expenses.
          </p>
        </div>

        <SummaryCards
          statistics={dashboardData?.statistics}
        />

        

        <MonthlyExpenseChart
           data={dashboardData?.monthlyExpenses}
        />

        {/* Bottom Section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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