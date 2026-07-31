import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import {
  addExpense,
  updateExpense,
} from "../../services/expenseService";
import { toast } from "react-toastify";

export default function ExpenseFormModal({
  isOpen,
  onClose,
  onSuccess,
  expense = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
    receipt: null,
});

  const [preview, setPreview] = useState("");

  useEffect(() => {
  if (expense) {
    setFormData({
      name: expense.name || "",
      amount: expense.amount || "",
      category: expense.category || "",
      description: expense.description || "",
      receipt: null,
    });

    setPreview(expense.receipt || "");
  } else {
    setFormData({
      name: "",
      amount: "",
      category: "",
      description: "",
      receipt: null,
    });

    setPreview("");
  }
}, [expense, isOpen]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files) {
    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      receipt: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  function removeReceipt() {
  setPreview("");

  setFormData((prev) => ({
    ...prev,
    receipt: null,
  }));
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const expenseData = new FormData();

      expenseData.append("name", formData.name);
      expenseData.append("amount", formData.amount);
      expenseData.append("category", formData.category);
      expenseData.append("description", formData.description);

      if (formData.receipt) {
        expenseData.append("receipt", formData.receipt);
      }

      let response;

      if (expense) {
        response = await updateExpense(expense._id, expenseData);
      } else {
        response = await addExpense(expenseData);
      }

      toast.success(response.message);

      setFormData({
        name: "",
        amount: "",
        category: "",
        description: "",
        receipt: null,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

     toast.error(
        error.response?.data?.message ||
        `Failed to ${expense ? "update" : "add"} expense`
    );
    }
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="border-b border-gray-100 px-8 py-6">

        <h2 className="text-3xl font-bold text-gray-800">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {expense
            ? "Update your expense details."
            : "Fill in the details below to add a new expense."}
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-8 py-8"
      >

        {/* Expense Name */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Expense Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Coffee, Grocery, Netflix..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              px-4
              py-3
              outline-none
              transition-all
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {/* Amount + Category */}
        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>

          </div>

        </div>


       
        <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          placeholder="Example: Dinner with friends, Monthly electricity bill..."
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
            outline-none
            resize-none
            transition-all
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100
          "
       />

  <div className="mt-1 flex justify-end">
    <span className="text-xs text-gray-400">
      {formData.description?.length || 0}/200
    </span>
  </div>
</div>

        {/* Receipt */}

<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Receipt (Optional)
  </label>

  {!preview ? (
    <label
      className="
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-gray-300
        bg-gray-50
        p-8
        transition
        hover:border-blue-500
        hover:bg-blue-50
      "
    >
      <FaCloudUploadAlt
        size={42}
        className="text-blue-600"
      />

      <p className="mt-4 font-semibold text-gray-700">
        Click to upload receipt
      </p>

      <p className="mt-1 text-sm text-gray-500">
        JPG, PNG, JPEG
      </p>

      <input
        type="file"
        name="receipt"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  ) : (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <img
        src={preview}
        alt="Receipt Preview"
        className="h-72 w-full object-contain bg-white"
      />

      <div className="flex items-center justify-between p-4">
        <div>
          <p className="font-semibold text-gray-700">
            {formData.receipt
              ? formData.receipt.name
              : "Current Receipt"}
          </p>

          <p className="text-sm text-gray-500">
            Preview
          </p>
        </div>

        <div className="flex gap-2">
          <label className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Change

            <input
              type="file"
              name="receipt"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={removeReceipt}
            className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )}
</div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-gray-200
              px-6
              py-3
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              transition-all
            "
          >
            {expense ? "Update Expense" : "Save Expense"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}