import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Receipt,
  BarChart3,
  Plus,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getTripDashboard } from "../../services/expenseTripService";
import { deleteExpense } from "../../services/expenseService";

import TripStats from "../../components/trip/TripStats";
import DailyExpenseChart from "../../components/trip/DailyExpenseChart";
import CategoryPieChart from "../../components/trip/CategoryPieChart";
import RecentExpenses from "../../components/trip/RecentExpenses";
import TripExpenseModal from "../../components/trip/TripExpenseModal";

export default function TripDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getTripDashboard(id);

      setDashboard(response.dashboard);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setShowExpenseModal(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowExpenseModal(true);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(selectedExpense._id);

      setShowDeleteModal(false);
      setSelectedExpense(null);

      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-500 text-xl">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboard || dashboard.summary.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Dashboard not found.
        </div>
      </DashboardLayout>
    );
  }

  const trip = dashboard.summary[0];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/trips")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Trips
        </button>

        <button
          onClick={handleAddExpense}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
        >
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {trip.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {trip.destination}
        </p>
      </div>

      <div className="mt-8">
        <TripStats trip={trip} />
      </div>

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-blue-600" />

          <h2 className="text-xl font-bold">
            Daily Expense Chart
          </h2>
        </div>

        <DailyExpenseChart
          data={dashboard.dailyChart}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Receipt className="text-blue-600" />

            <h2 className="text-xl font-bold">
              Recent Expenses
            </h2>
          </div>

          <RecentExpenses
            expenses={dashboard.recentExpenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteClick}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-blue-600" />

            <h2 className="text-xl font-bold">
              Category Distribution
            </h2>
          </div>

          <CategoryPieChart
            data={dashboard.categoryChart}
          />
        </div>
      </div>

      <TripExpenseModal
        isOpen={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setSelectedExpense(null);
        }}
        onSuccess={loadDashboard}
        tripId={id}
        expense={selectedExpense}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800">
              Delete Expense
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete this expense?
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedExpense(null);
                }}
                className="rounded-xl border border-gray-300 px-5 py-2 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}