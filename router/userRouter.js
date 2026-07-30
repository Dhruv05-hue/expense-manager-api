const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const authMiddleware = require("../middleware/authMiddleware.js");


router.get("/test", (req, res) => {
    res.send("User Router is working");
});

// Authentication
router.post("/signup", asyncHandler(userController.signup));
router.post("/login", asyncHandler(userController.login));
router.post("/verifyotp", asyncHandler(userController.verifyOTP));
router.post("/resendotp", asyncHandler(userController.resendOTP));
router.post("/forgotpassword", asyncHandler(userController.forgotPassword));
router.post("/resetpassword", asyncHandler(userController.resetPassword));

// Profile
router.get("/profile",authMiddleware,asyncHandler(userController.getProfile));

router.put("/profile",authMiddleware,asyncHandler(userController.updateProfile));

router.put("/change-password",authMiddleware,asyncHandler(userController.changePassword));

router.delete( "/delete",authMiddleware,asyncHandler(userController.deleteAccount));

module.exports = router;