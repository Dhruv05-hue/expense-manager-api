const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    // Expense name
    name: {

        type: String,

        required: true,

        trim: true

    },

    amount: {

        type: Number,

        required: true,

        min: 1

    },

    // Cloudinary Image URL
    receipt: {

        type: String,

        default: null

    },

    // Cloudinary Public ID
    receiptPublicId: {

        type: String,

        default: null

    },

    category: {
        type: String,
        required: true,
        trim : true,
        enum: [
            "Food",
            "Transport",
            "Shopping",
            "Bills",
            "Entertainment",
            "Health",
            "Education",
            "Travel",
            "Other"
        ]
    },

    description: {
        type: String,
        trim: true,
        maxlength: 200,
        default: "",
    },

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    }

},
{

    timestamps: true

});

// Index for fast queries
expenseSchema.index({

    user: 1,

    createdAt: -1

});

expenseSchema.index({
    user: 1,
    category: 1
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;