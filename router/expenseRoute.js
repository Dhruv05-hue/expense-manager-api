const express = require("express")
const expenseController = require("../controller/expenseController.js")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadmiddleware.js")
const expenseMiddleware = require("../middleware/expensemiddleware.js");
const asyncHandler = require("../middleware/asyncHandler.js")
router.get("/expenses",authMiddleware,asyncHandler(expenseController.getExpenses))
router.post("/expenses",authMiddleware,upload.single("receipt"),expenseMiddleware,asyncHandler(expenseController.addExpenses));
router.get("/expenses/:id",authMiddleware,asyncHandler(expenseController.getExpensesbyid));
router.get("/dashboard",authMiddleware,asyncHandler(expenseController.dashboard));
router.put("/expenses/:id",authMiddleware,upload.single("receipt"),expenseMiddleware,asyncHandler(expenseController.updateExpenses));
router.delete("/expenses/:id",authMiddleware,asyncHandler(expenseController.deleteExpenses));
module.exports = router;