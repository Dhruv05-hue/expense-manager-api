function formatExpense(expense, req) {

    return {

        ...expense.toObject(),

        receiptUrl: expense.receipt
            ? `${req.protocol}://${req.get("host")}/${expense.receipt}`
            : null

    };

}

module.exports = formatExpense;