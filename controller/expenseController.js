const Expense = require("../model/Expense.js");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

// =========================
// GET ALL EXPENSES
// =========================
async function getExpenses(req, res) {

    // ---------- Pagination ----------

    let page = Number(req.query.page);

    if (isNaN(page) || page < 1) {
        page = 1;
    }

    let limit = Number(req.query.limit);

    if (isNaN(limit) || limit < 1) {
        limit = 5;
    }

    if (limit > 100) {
        limit = 100;
    }

    const skip = (page - 1) * limit;

    // ---------- Sorting ----------

    let sort = req.query.sort || "createdAt";

    const allowedSortFields = [
        "name",
        "amount",
        "category",
        "createdAt"
    ];

    if (!allowedSortFields.includes(sort)) {
        sort = "createdAt";
    }

    let order = req.query.order || "desc";

    if (!["asc", "desc"].includes(order)) {
        order = "desc";
    }

    const sortObj = {};

    sortObj[sort] = order === "asc" ? 1 : -1;

    // ---------- Filtering ----------

    const filter = {
        user: req.user.id
    };

    // Search by expense name
    if (req.query.search) {

        filter.name = {
            $regex: req.query.search,
            $options: "i"
        };

    }

    // Category filter
    if (req.query.category) {

        filter.category = req.query.category;

    }

    // Amount filter
    const amountFilter = {};

    if (req.query.minAmount !== undefined) {

        const minAmount = Number(req.query.minAmount);

        if (!isNaN(minAmount)) {
            amountFilter.$gte = minAmount;
        }

    }

    if (req.query.maxAmount !== undefined) {

        const maxAmount = Number(req.query.maxAmount);

        if (!isNaN(maxAmount)) {
            amountFilter.$lte = maxAmount;
        }

    }

    if (Object.keys(amountFilter).length > 0) {

        filter.amount = amountFilter;

    }

    const totalExpenses = await Expense.countDocuments(filter);

    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await Expense.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit);

    return res.status(200).json({

        success: true,

        message: "Expenses fetched successfully",

        totalExpenses,

        totalPages,

        page,

        limit,

        expenses

    });

}

// =========================
// ADD EXPENSE
// =========================

async function addExpenses(req, res) {

    const expense = new Expense({

        name: req.body.name,

        amount: req.body.amount,

        category: req.body.category,

        receipt: req.file ? req.file.path : null,

        receiptPublicId: req.file ? req.file.filename : null,

        user: req.user.id

    });

    await expense.save();

    return res.status(201).json({

        success: true,

        message: "Expense added successfully",

        expense

    });

}

// =========================
// GET EXPENSE BY ID
// =========================

async function getExpensesbyid(req, res) {

    const expense = await Expense.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!expense) {

        return res.status(404).json({

            success: false,

            message: "Expense not found"

        });

    }

    return res.status(200).json({

        success: true,

        expense

    });

}

// =========================
// UPDATE EXPENSE
// =========================

async function updateExpenses(req, res) {

    const expense = await Expense.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!expense) {

        return res.status(404).json({

            success: false,

            message: "Expense not found"

        });

    }

    expense.name = req.body.name;

    expense.amount = req.body.amount;

    expense.category = req.body.category;

    if (req.file) {

        if (expense.receiptPublicId) {

            await cloudinary.uploader.destroy(
                expense.receiptPublicId
            );

        }

        expense.receipt = req.file.path;

        expense.receiptPublicId = req.file.filename;

    }

    await expense.save();

    return res.status(200).json({

        success: true,

        message: "Expense updated successfully",

        expense

    });

}

// =========================
// DELETE EXPENSE
// =========================

async function deleteExpenses(req, res) {

    const expense = await Expense.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!expense) {

        return res.status(404).json({

            success: false,

            message: "Expense not found"

        });

    }

    if (expense.receiptPublicId) {

        await cloudinary.uploader.destroy(
            expense.receiptPublicId
        );

    }

    await expense.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Expense deleted successfully"

    });

}

// =========================
// DASHBOARD
// =========================

async function dashboard(req, res) {

    const dashboard = await Expense.aggregate([

        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user.id)
            }
        },

        {
            $facet: {

                // =========================
                // SUMMARY STATISTICS
                // =========================

                statistics: [

                    {
                        $group: {

                            _id: null,

                            totalExpenses: {
                                $sum: 1
                            },

                            totalAmount: {
                                $sum: "$amount"
                            },

                            highestExpense: {
                                $max: "$amount"
                            },

                            lowestExpense: {
                                $min: "$amount"
                            },

                            averageExpense: {
                                $avg: "$amount"
                            }

                        }
                    }

                ],

                // =========================
                // RECENT EXPENSES
                // =========================

                latestExpenses: [

                    {
                        $sort: {
                            createdAt: -1
                        }
                    },

                    {
                        $limit: 5
                    }

                ],

                // =========================
                // MONTHLY EXPENSES
                // =========================

                monthlyExpenses: [

                    {
                        $group: {

                            _id: {
                                year: {
                                    $year: "$createdAt"
                                },
                                month: {
                                    $month: "$createdAt"
                                }
                            },

                            totalAmount: {
                                $sum: "$amount"
                            }

                        }
                    },

                    {
                        $sort: {
                            "_id.year": 1,
                            "_id.month": 1
                        }
                    },

                    {
                        $project: {

                            _id: 0,

                            year: "$_id.year",

                            month: "$_id.month",

                            totalAmount: 1

                        }
                    }

                ],

                // =========================
                // CATEGORY EXPENSES
                // =========================

                categoryExpenses: [

                    {
                        $group: {

                            _id: "$category",

                            totalAmount: {
                                $sum: "$amount"
                            },

                            totalExpenses: {
                                $sum: 1
                            }

                        }
                    },

                    {
                        $sort: {
                            totalAmount: -1
                        }
                    },

                    {
                        $project: {

                            _id: 0,

                            category: "$_id",

                            totalAmount: 1,

                            totalExpenses: 1

                        }
                    }

                ]

            }

        }

    ]);

    dashboard[0].statistics = dashboard[0].statistics[0] || {

        totalExpenses: 0,

        totalAmount: 0,

        highestExpense: 0,

        lowestExpense: 0,

        averageExpense: 0

    };

    return res.status(200).json({

        success: true,

        message: "Dashboard fetched successfully",

        data: dashboard[0]

    });

}


module.exports = {

    getExpenses,

    addExpenses,

    getExpensesbyid,

    updateExpenses,

    deleteExpenses,

    dashboard

};