import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function exportExcel(expenses = []) {
  // Format data for Excel
  const formattedData = expenses.map((expense, index) => ({
    "Sr No": index + 1,
    "Expense Name": expense.name,
    Category: expense.category,
    Amount: Number(expense.amount),
    Description: expense.description || "-",
    Date: new Date(expense.createdAt).toLocaleDateString(),
  }));

  // Calculate total amount
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  // Add summary rows
  formattedData.push({});
  formattedData.push({
    "Expense Name": "Total Expenses",
    Category: expenses.length,
  });

  formattedData.push({
    "Expense Name": "Total Amount",
    Amount: totalAmount,
  });

  // Create workbook
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Set column widths
  worksheet["!cols"] = [
    { wch: 8 },   // Sr No
    { wch: 28 },  // Expense Name
    { wch: 18 },  // Category
    { wch: 15 },  // Amount
    { wch: 40 },  // Description
    { wch: 18 },  // Date
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Expenses"
  );

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(
    fileData,
    `Expense_Report_${
      new Date().toISOString().split("T")[0]
    }.xlsx`
  );
}