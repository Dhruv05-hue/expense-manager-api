const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const { sendOTPEmail } = require("../services/emailService");
require("dotenv").config();

async function signup(req, res) {

    const existingUser = await User.findOne({
        email: req.body.email
    });

    if (existingUser) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    profession: req.body.profession,
    otp: otp.toString(),
    otpExpires: otpExpires
});

    await user.save();

    await sendOTPEmail(
        user.email,
        otp,
        "Expense Manager Email Verification"
    );

    return res.status(201).json({
         success: true,
         message: "Registration successful. Please verify your email.",
         email : user.email
    });
}

async function login(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Wrong password"
        });
    }

    if (!user.isVerified) {
        return res.status(403).json({
            success: false,
            message: "Please verify your email first."
        });
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
        
    );

    return res.status(200).json({
        success: true,
        message: "Login successful.",
        token,
        user:{
        id:user._id,
        name:user.name,
        email:user.email
    }
    });
}

async function verifyOTP(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.isVerified) {
        return res.status(400).json({
            success: false,
            message: "Email is already verified."
        });
    }

    if (user.otp !== req.body.otp) {
        return res.status(400).json({
            success: false,
            message: "OTP is incorrect"
        });
    }

    if (user.otpExpires < new Date()) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired"
        });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Email verified successfully."
    });
}

async function resendOTP(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.isVerified) {
        return res.status(400).json({
            success: false,
            message: "Email is already verified."
        });
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp.toString();
    user.otpExpires = otpExpires;

    await user.save();

    await sendOTPEmail(
        user.email,
        otp,
        "Expense Manager - New OTP"
    );

    return res.status(200).json({
        success: true,
        message: "A new OTP has been sent to your email."
    });
}

async function forgotPassword(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp.toString();
    user.otpExpires = otpExpires;

    await user.save();

    await sendOTPEmail(
        user.email,
        otp,
        "Expense Manager Password Reset OTP"
    );

    return res.status(200).json({
        success: true,
        message: "Password reset OTP sent successfully."
    });

}

async function resetPassword(req, res) {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.otp !== req.body.otp) {
        return res.status(400).json({
            success: false,
            message: "Incorrect OTP"
        });
    }

    if (user.otpExpires < new Date()) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired"
        });
    }

    const hashedPassword = await bcrypt.hash(
        req.body.newPassword,
        10
    );

    user.password = hashedPassword;

    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully."
    });

}

async function getProfile(req, res) {
    const user = await User.findById(req.user.id).select(
        "-password -otp -otpExpires"
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        user
    });
}

async function updateProfile(req, res) {
    const { name, phone, profession } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    user.name = name;
    user.phone = phone;
    user.profession = profession;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user
    });
}

async function sendChangePasswordOTP(req, res) {

    const { currentPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Current password is incorrect",
        });
    }

    if (
        user.passwordOtpLastSent &&
        Date.now() - user.passwordOtpLastSent.getTime() < 60000
    ) {
        return res.status(429).json({
            success: false,
            message: "Please wait before requesting another OTP.",
        });
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    user.passwordOtp = otp.toString();
    user.passwordOtpExpires = new Date(Date.now() + 5 * 60 * 1000);
    user.passwordOtpAttempts = 0;
    user.passwordOtpLastSent = new Date();

    await user.save();

    await sendOTPEmail(
        user.email,
        otp,
        "Expense Manager Password Change OTP",
        "Password Change Verification",
        "5 minutes"
    );

    return res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
    });
}

async function changePassword(req, res) {
    const { otp, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    // Check OTP
    if (user.passwordOtp !== otp) {
        user.passwordOtpAttempts += 1;
        await user.save();

        return res.status(400).json({
            success: false,
            message: "Invalid OTP",
        });
    }

    // Check OTP Expiry
    if (user.passwordOtpExpires < new Date()) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired",
        });
    }

    // Maximum Attempts
    if (user.passwordOtpAttempts >= 3) {
        user.passwordOtp = null;
        user.passwordOtpExpires = null;
        user.passwordOtpAttempts = 0;

        await user.save();

        return res.status(400).json({
            success: false,
            message: "Maximum OTP attempts exceeded. Please request a new OTP.",
        });
    }

    // Update Password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear OTP
    user.passwordOtp = null;
    user.passwordOtpExpires = null;
    user.passwordOtpAttempts = 0;
    user.passwordOtpLastSent = null;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully.",
    });
}

async function deleteAccount(req, res) {
    await User.findByIdAndDelete(req.user.id);

    return res.status(200).json({
        success: true,
        message: "Account deleted successfully."
    });
}

module.exports = {
    signup,
    login,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,

    getProfile,
    updateProfile,
    sendChangePasswordOTP,
    changePassword,
    deleteAccount
};