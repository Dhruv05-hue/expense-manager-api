const Expense = require("../model/Expense.js")
const fs = require("fs");
const mongoose = require("mongoose");
const formatExpense = require("../helpers/expenseHelper");

async function getExpenses(req, res) {

    // ---------------- PAGINATION ----------------

    // Current page (Default = 1)
    let page = Number(req.query.page);

    if (isNaN(page) || page < 1) {
        page = 1;
    }

    // Number of documents per page (Default = 5)
    let limit = Number(req.query.limit);

    if (isNaN(limit) || limit < 1) {
        limit = 5;
    }

    if (limit > 100) {
        limit = 100;
    }

    // Skip documents of previous pages
    const skip = (page - 1) * limit;


    // ---------------- SORTING ----------------

    // Field to sort by (Default = createdAt)
    let sort = req.query.sort || "createdAt";

    const allowedSortFields = [
        "name",
        "amount",
        "createdAt"
    ];

    if (!allowedSortFields.includes(sort)) {
        sort = "createdAt";
    }

    // Sort order (Default = descending)
    let order = req.query.order || "desc";

    const allowedOrder = [
        "asc",
        "desc"
    ];

    if (!allowedOrder.includes(order)) {
        order = "desc";
    }

    // Dynamic sort object
    // Example:
    // { amount: -1 }
    // { createdAt: 1 }
    const sortObj = {};

    sortObj[sort] = order === "asc" ? 1 : -1


    // ---------------- FILTERING ----------------

    // Base filter:
    // Always return only logged-in user's expenses
    const filter = {
        user: req.user.id
    };

    // Optional filter
    // Example:
    // GET /expenses?minAmount=1000

    const amountFilter = {}

    if (req.query.minAmount !== undefined) {

        const minAmount = Number(req.query.minAmount);

        if(!isNaN(minAmount)){

        amountFilter.$gte = minAmount

        }
    }

    if(req.query.maxAmount !== undefined){

        const maxAmount = Number(req.query.maxAmount)

        if(!isNaN(maxAmount)){

            amountFilter.$lte = maxAmount

        }


    }

    // only add amount filter if one of max and min amount are present in amountFilter 
    if (Object.keys(amountFilter).length > 0) { // it  the length of amountFilter object if both min and max are missing it will not be added to filter

        filter.amount = amountFilter;

    }
     
    if (req.query.search) {

        filter.name = {

            $regex: req.query.search,

            $options: "i"

        };

    }


    // Count documents AFTER applying filters
    // Needed for correct pagination
    const totalExpenses = await Expense.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(totalExpenses / limit);


    // Fetch expenses
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
        expenses: expenses.map(expense =>formatExpense(expense, req))
    });

}


async function addExpenses(req,res){
    

    

    const expense = new Expense({

        name : req.body.name,
        amount : req.body.amount,
        receipt: req.file ? req.file.path : null,
        user : req.user.id
    })

    await expense.save();
    res.status(201).json({

        success:true,

        message:"Expense added successfully",

        expense :  formatExpense(expense, req)

    })

}
 


async function getExpensesbyid(req,res){
       
           const data = await Expense.findOne({

               _id : req.params.id,
               user : req.user.id
           })
           if(!data){
            return  res.status(404).json({

                        success:false,

                        message:"Expense not found"

                    });
           }
           res.status(200).json({

                success:true,

                expense: formatExpense(data, req)

            });
        
        

}

async function updateExpenses(req,res){
             
      

            const data = await Expense.findOne({

                _id : req.params.id,
                user : req.user.id

            })
            if(!data){
                
               return res.status(404).json({

                        success:false,

                        message:"Expense not found"

                    });

            }

            

            data.name = req.body.name;
            data.amount = req.body.amount;
            if (req.file) {
                data.receipt = req.file.path;
            }
            
            await data.save()
            res.status(200).json({

                success:true,

                message:"Expense updated successfully",

                expense: formatExpense(data, req)

            });

             
}

async function deleteExpenses(req,res){

    

        const data = await Expense.findOne({

            _id : req.params.id,
            user : req.user.id
        })
        if(!data){
            return res.status(404).json({

                        success:false,

                        message:"Expense not found"

                    });
        }

        if (data.receipt && fs.existsSync(data.receipt)) {

            fs.unlinkSync(data.receipt);

        }

        await data.deleteOne()
        res.status(200).json({

                success:true,

                message:"Expense deleted successfully"

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

    // Convert statistics array into a single object
    dashboard[0].statistics =
        dashboard[0].statistics[0] || {

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