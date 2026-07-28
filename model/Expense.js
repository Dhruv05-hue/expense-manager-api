const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    // Expense name
    name: {

        type: String,

        // Name is compulsory
        required: true,

        // Removes spaces from beginning and end
        trim: true
    },

    amount: {

        type: Number,

        required: true,

        // Amount cannot be 0 or negative
        min: 1
    },

    receipt : {

        type : String,
        

    },

    user: {

        // Creates relationship with User collection
        type: mongoose.Schema.Types.ObjectId,

        // Reference to User model
        ref: "User",

        required: true
    }

},
{

    // Automatically creates:
    // createdAt
    // updatedAt
    timestamps: true

});

expenseSchema.index({
    user: 1,
    createdAt: -1
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;