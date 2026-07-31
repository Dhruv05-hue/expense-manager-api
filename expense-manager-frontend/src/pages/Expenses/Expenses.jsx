import { useEffect, useState } from "react";
import {
  getExpenses,
  deleteExpense,
} from "../../services/expenseService";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseTable from "../../components/expense/ExpenseTable";
import ExpenseFormModal from "../../components/expense/ExpenseFormModal";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

import exportPdf from "../../utils/exportPdf";
import exportExcel from "../../utils/exportExcel";

export default function Expenses() {
  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Expenses
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt-desc");

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Expenses
  useEffect(() => {
    fetchExpenses();
  }, [page, debouncedSearch, category, sort]);

  async function fetchExpenses() {
    try {
      setLoading(true);

      const [sortBy, order] = sort.split("-");

      const res = await getExpenses({
        page,
        limit: 5,
        search: debouncedSearch,
        category,
        sort: sortBy,
        order,
      });

      setExpenses(res.expenses);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  // Add Expense
  function handleAddExpense() {
    setSelectedExpense(null);
    setIsModalOpen(true);
  }

  // Edit Expense
  function handleEditExpense(expense) {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  }

  // Delete Modal
  function handleDeleteExpense(expense) {
    setExpenseToDelete(expense);
    setDeleteModalOpen(true);
  }

  // Confirm Delete
  async function confirmDelete() {
    if (!expenseToDelete) return;

    try {
      setDeleteLoading(true);

      const response = await deleteExpense(expenseToDelete._id);

      toast.success(response.message);

      setDeleteModalOpen(false);
      setExpenseToDelete(null);

      if (expenses.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchExpenses();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  // Export PDF
  function handleExportPdf() {
    if (!expenses.length) {
      toast.info("No expenses available to export.");
      return;
    }

    exportPdf(expenses);
  }

  // Export Excel
  function handleExportExcel() {
    if (!expenses.length) {
      toast.info("No expenses available to export.");
      return;
    }

    exportExcel(expenses);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Expense Manager
            </span>

            <h1 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">
              Expenses
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              Track, organize and manage all your expenses in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleExportPdf}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-red-700
              "
            >
              <FaFilePdf />
              Export PDF
            </button>

            <button
              onClick={handleExportExcel}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-green-600
                px-5
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-700
              "
            >
              <FaFileExcel />
              Export Excel
            </button>

            <button
              onClick={handleAddExpense}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <FaPlus />
              Add Expense
            </button>

          </div>

        </div>

        {/* Filters */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
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

        {/* Expense Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
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

        {/* Add/Edit Expense */}
        <ExpenseFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExpense(null);
          }}
          onSuccess={fetchExpenses}
          expense={selectedExpense}
        />

        {/* Delete Confirmation */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          loading={deleteLoading}
          title="Delete Expense"
          message={`Are you sure you want to permanently delete "${expenseToDelete?.name}"? This action cannot be undone.`}
          onCancel={() => {
            setDeleteModalOpen(false);
            setExpenseToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      </div>
    </DashboardLayout>
  );
}