const express = require("express");

const router = express.Router();

const expenseTripController = require("../controller/ExpenseTripController");

const authMiddleware = require("../middleware/authMiddleware");
const tripMiddleware = require("../middleware/tripMiddleware");
const asyncHandler = require("../middleware/asyncHandler");



router.post( "/",authMiddleware,tripMiddleware,asyncHandler(expenseTripController.createTrip));
router.get("/",authMiddleware,asyncHandler(expenseTripController.getTrips));
router.get("/dashboard/:id",authMiddleware,asyncHandler(expenseTripController.getTripDashboard));
router.get("/:id",authMiddleware,asyncHandler(expenseTripController.getTripById));
router.put( "/:id", authMiddleware, tripMiddleware, asyncHandler(expenseTripController.updateTrip));
router.delete("/:id",authMiddleware,asyncHandler(expenseTripController.deleteTrip));


module.exports = router;