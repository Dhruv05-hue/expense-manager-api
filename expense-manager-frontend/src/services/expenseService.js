import api from "./api";

// Get all expenses
export const getExpenses = async (params = {}) => {
  const response = await api.get("/expense/expenses", {
    params,
  });
  return response.data;
};

// Get expense by ID
export const getExpenseById = async (id) => {
  const response = await api.get(`/expense/expenses/${id}`);
  return response.data;
};

// Add expense
export const addExpense = async (formData) => {
  const response = await api.post("/expense/expenses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update expense
export const updateExpense = async (id, formData) => {
  const response = await api.put(`/expense/expenses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expense/expenses/${id}`);
  return response.data;
};

// Dashboard
export const getDashboard = async () => {
  const response = await api.get("/expense/dashboard");
  return response.data;
};