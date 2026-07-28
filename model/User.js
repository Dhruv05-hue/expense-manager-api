const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String
    },

    otpExpires: {
        type: Date
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;