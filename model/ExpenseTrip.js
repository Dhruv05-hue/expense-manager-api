const mongoose = require("mongoose");

const expenseTripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    destination: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    budget: {
      type: Number,
      required: true,
      min: 1,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseTripSchema.index({
  user: 1,
  createdAt: -1,
});

const ExpenseTrip = mongoose.model("ExpenseTrip", expenseTripSchema);

module.exports = ExpenseTrip;