const Expense = require("../model/Expense.js");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

async function getExpenses(req, res) {

    // ---------------- PAGINATION ----------------

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

    // ---------------- SORTING ----------------

    let sort = req.query.sort || "createdAt";

    const allowedSortFields = [
        "name",
        "amount",
        "createdAt"
    ];

    if (!allowedSortFields.includes(sort)) {
        sort = "createdAt";
    }

    let order = req.query.order || "desc";

    const allowedOrder = [
        "asc",
        "desc"
    ];

    if (!allowedOrder.includes(order)) {
        order = "desc";
    }

    const sortObj = {};

    sortObj[sort] = order === "asc" ? 1 : -1;

    // ---------------- FILTERING ----------------

    const filter = {
        user: req.user.id
    };

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

    if (req.query.search) {

        filter.name = {

            $regex: req.query.search,

            $options: "i"

        };

    }

    const totalExpenses = await Expense.countDocuments(filter);

    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await Expense.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit);

    res.status(200).json({

        success: true,

        message: "Expenses fetched successfully",

        totalExpenses,

        totalPages,

        page,

        limit,

        expenses

    });

}

async function addExpenses(req, res) {

    const expense = new Expense({

        name: req.body.name,

        amount: req.body.amount,

        receipt: req.file ? req.file.path : null,

        receiptPublicId: req.file ? req.file.filename : null,

        user: req.user.id

    });

    await expense.save();

    res.status(201).json({

        success: true,

        message: "Expense added successfully",

        expense

    });

}

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

    res.status(200).json({

        success: true,

        expense

    });

}

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

    if (req.file) {

        if (expense.receiptPublicId) {

            await cloudinary.uploader.destroy(expense.receiptPublicId);

        }

        expense.receipt = req.file.path;

        expense.receiptPublicId = req.file.filename;

    }

    await expense.save();

    res.status(200).json({

        success: true,

        message: "Expense updated successfully",

        expense

    });

}

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

        await cloudinary.uploader.destroy(expense.receiptPublicId);

    }

    await expense.deleteOne();

    res.status(200).json({

        success: true,

        message: "Expense deleted successfully"

    });

}

async function dashboard(req, res) {

    const dashboard = await Expense.aggregate([

        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user.id)
            }
        },

        {
            $facet: {

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

                            averageExpense: {
                                $avg: "$amount"
                            },

                            highestExpense: {
                                $max: "$amount"
                            },

                            lowestExpense: {
                                $min: "$amount"
                            }

                        }
                    }

                ],

                latestExpenses: [

                    {
                        $sort: {
                            createdAt: -1
                        }
                    },

                    {
                        $limit: 5
                    }

                ]

            }
        }

    ]);

    dashboard[0].statistics = dashboard[0].statistics[0] || {

        totalExpenses: 0,

        totalAmount: 0,

        averageExpense: 0,

        highestExpense: 0,

        lowestExpense: 0

    };

    res.status(200).json({

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