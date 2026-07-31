import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function exportPdf(expenses = []) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(41, 98, 255);
  doc.text("Expense Manager Report", 14, 20);

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    14,
    28
  );

  // Summary
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text(`Total Expenses : ${expenses.length}`, 14, 38);
  doc.text(`Total Amount : ₹${totalAmount.toFixed(2)}`, 14, 46);

  // Table
  autoTable(doc, {
    startY: 55,

    head: [
      [
        "#",
        "Expense",
        "Category",
        "Amount",
        "Description",
        "Date",
      ],
    ],

    body: expenses.map((expense, index) => [
      index + 1,
      expense.name,
      expense.category,
      `₹${Number(expense.amount).toFixed(2)}`,
      expense.description || "-",
      new Date(expense.createdAt).toLocaleDateString(),
    ]),

    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle",
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },

    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 38 },
      2: { cellWidth: 28 },
      3: { cellWidth: 24 },
      4: { cellWidth: 60 },
      5: { cellWidth: 28 },
    },
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 35,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save(
    `Expense_Report_${new Date().toISOString().split("T")[0]}.pdf`
  );
}