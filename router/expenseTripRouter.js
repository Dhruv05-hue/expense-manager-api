const express = require("express");

const router = express.Router();

const expenseTripController = require("../controller/ExpenseTripController");

const authMiddleware = require("../middleware/authMiddleware");
const tripMiddleware = require("../middleware/tripMiddleware");
const asyncHandler = require("../middleware/asyncHandler");


// Create Trip
router.post(
    "/",
    authMiddleware,
    tripMiddleware,
    asyncHandler(expenseTripController.createTrip)
);


// Get All Trips
router.get(
    "/",
    authMiddleware,
    asyncHandler(expenseTripController.getTrips)
);


// Trip Dashboard
router.get(
    "/dashboard/:id",
    authMiddleware,
    asyncHandler(expenseTripController.getTripDashboard)
);


// Get Single Trip
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(expenseTripController.getTripById)
);


// Update Trip
router.put(
    "/:id",
    authMiddleware,
    tripMiddleware,
    asyncHandler(expenseTripController.updateTrip)
);


// Delete Trip
router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(expenseTripController.deleteTrip)
);


module.exports = router;