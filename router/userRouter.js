const userController = require("../controller/userController.js")
const express = require("express")
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler.js")

router.get("/test", function(req, res) {
    res.send("User Router is working");
});
router.post("/signup",asyncHandler(userController.signup))
router.post("/login",asyncHandler(userController.login))
router.post("/verifyotp",asyncHandler(userController.verifyOTP))
router.post("/resendotp",asyncHandler(userController.resendOTP))
router.post("/forgotpassword",asyncHandler(userController.forgotPassword));

router.post("/resetpassword",asyncHandler(userController.resetPassword));

module.exports = router;