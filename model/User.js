const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Profile Information
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    profession: {
      type: String,
      default: "",
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    // Authentication
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Email Verification OTP
    otp: {
      type: String,
    },

    otpExpires: {
      type: Date,
    },

    // Change Password OTP
    passwordOtp: {
      type: String,
    },

    passwordOtpExpires: {
      type: Date,
    },

    passwordOtpAttempts: {
      type: Number,
      default: 0,
    },

    passwordOtpLastSent: {
      type: Date,
    },
},
{
  timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;