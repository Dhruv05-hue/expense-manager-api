import { useEffect, useState } from "react";
import {
  getExpenses,
  deleteExpense,
} from "../../services/expenseService";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseTable from "../../components/expense/ExpenseTable";
import ExpenseFormModal from "../../components/expense/ExpenseFormModal";

export default function Expenses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt-desc");

  useEffect(() => {
    fetchExpenses();
  }, [page, search, category, sort]);

  async function fetchExpenses() {
    try {
      setLoading(true);

      const [sortBy, order] = sort.split("-");

      const res = await getExpenses({
        page,
        limit: 5,
        search,
        category,
        sort: sortBy,
        order,
      });

      setExpenses(res.expenses);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAddExpense() {
    setSelectedExpense(null);
    setIsModalOpen(true);
  }

  function handleEditExpense(expense) {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  }

  async function handleDeleteExpense(expense) {
    const confirmDelete = window.confirm(
      `Delete "${expense.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteExpense(expense._id);

      toast.success(response.message);

      fetchExpenses();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete expense"
      );
    }
  }

  return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Expenses
          </h1>

          <p className="text-gray-500 mt-2">
            Track, organize and manage all your expenses in one place.
          </p>
        </div>

        <button
          onClick={handleAddExpense}
          className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            hover:scale-105
            transition-all
            duration-300
          "
        >
          + Add Expense
        </button>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <ExpenseFilters
          search={search}
          category={category}
          sort={sort}
          onSearchChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
          onCategoryChange={(value) => {
            setPage(1);
            setCategory(value);
          }}
          onSortChange={(value) => {
            setPage(1);
            setSort(value);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <ExpenseTable
          expenses={expenses}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>

      {/* Modal */}
      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
        }}
        onSuccess={fetchExpenses}
        expense={selectedExpense}
      />

    </div>
  </DashboardLayout>
);
}