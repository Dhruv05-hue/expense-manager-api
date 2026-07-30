const ExpenseTrip = require("../model/ExpenseTrip");
const mongoose = require("mongoose");


// Create Trip
const createTrip = async (req, res) => {

    const trip = new ExpenseTrip({

        name: req.body.name,

        destination: req.body.destination,

        budget: req.body.budget,

        startDate: req.body.startDate,

        endDate: req.body.endDate,

        description: req.body.description,

        user: req.user.id

    });

    await trip.save();

    return res.status(201).json({

        success: true,

        message: "Trip created successfully.",

        trip

    });

};


// Get All Trips
const getTrips = async (req, res) => {

    const trips = await ExpenseTrip.aggregate([

        {

            $match: {

                user: new mongoose.Types.ObjectId(req.user.id)

            }

        },

        {

            $lookup: {

                from: "expenses",

                localField: "_id",

                foreignField: "trip",

                as: "expenses"

            }

        },

        {

            $addFields: {

                expenseCount: {

                    $size: "$expenses"

                },

                totalSpent: {

                    $sum: "$expenses.amount"

                }

            }

        },

        {

            $addFields: {

                remainingBudget: {

                    $subtract: [

                        "$budget",

                        "$totalSpent"

                    ]

                }

            }

        },

        {

            $project: {

                expenses: 0,

                __v: 0

            }

        },

        {

            $sort: {

                createdAt: -1

            }

        }

    ]);

    return res.status(200).json({

        success: true,

        trips

    });

};

// Get Single Trip
const getTripById = async (req, res) => {

    const trip = await ExpenseTrip.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!trip) {

        return res.status(404).json({

            success: false,

            message: "Trip not found."

        });

    }

    return res.status(200).json({

        success: true,

        trip

    });

};


// Update Trip
const updateTrip = async (req, res) => {

    const trip = await ExpenseTrip.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!trip) {

        return res.status(404).json({

            success: false,

            message: "Trip not found."

        });

    }

    trip.name = req.body.name;

    trip.destination = req.body.destination;

    trip.budget = req.body.budget;

    trip.startDate = req.body.startDate;

    trip.endDate = req.body.endDate;

    trip.description = req.body.description;

    await trip.save();

    return res.status(200).json({

        success: true,

        message: "Trip updated successfully.",

        trip

    });

};


// Delete Trip
const deleteTrip = async (req, res) => {

    const trip = await ExpenseTrip.findOne({

        _id: req.params.id,

        user: req.user.id

    });

    if (!trip) {

        return res.status(404).json({

            success: false,

            message: "Trip not found."

        });

    }

    await trip.deleteOne();

    return res.status(200).json({

        success: true,

        message: "Trip deleted successfully."

    });

};

// Trip Dashboard
const getTripDashboard = async (req, res) => {

    const dashboard = await ExpenseTrip.aggregate([

        {

            $match: {

                _id: new mongoose.Types.ObjectId(req.params.id),

                user: new mongoose.Types.ObjectId(req.user.id)

            }

        },

        {

            $lookup: {

                from: "expenses",

                localField: "_id",

                foreignField: "trip",

                as: "expenses"

            }

        },

        {

            $facet: {

                summary: [

                    {

                        $project: {

                            name: 1,

                            destination: 1,

                            budget: 1,

                            startDate: 1,

                            endDate: 1,

                            description: 1,

                            totalSpent: {

                                $sum: "$expenses.amount"

                            },

                            expenseCount: {

                                $size: "$expenses"

                            },

                            highestExpense: {

                                $max: "$expenses.amount"

                            },

                            averageExpense: {

                                $avg: "$expenses.amount"

                            }

                        }

                    },

                    {

                        $addFields: {

                            remainingBudget: {

                                $subtract: [

                                    "$budget",

                                    "$totalSpent"

                                ]

                            }

                        }

                    }

                ],

                categoryChart: [

                    {

                        $unwind: {

                            path: "$expenses",

                            preserveNullAndEmptyArrays: false

                        }

                    },

                    {

                        $group: {

                            _id: "$expenses.category",

                            amount: {

                                $sum: "$expenses.amount"

                            }

                        }

                    },

                    {

                        $project: {

                            _id: 0,

                            category: "$_id",

                            amount: 1

                        }

                    }

                ],

                recentExpenses: [

                    {

                        $unwind: {

                            path: "$expenses",

                            preserveNullAndEmptyArrays: false

                        }

                    },

                    {

                        $replaceRoot: {

                            newRoot: "$expenses"

                        }

                    },

                    {

                        $sort: {

                            createdAt: -1

                        }

                    },

                    {

                        $limit: 5

                    }

                ],

                dailyChart: [

                    {

                        $unwind: {

                            path: "$expenses",

                            preserveNullAndEmptyArrays: false

                        }

                    },

                    {

                        $group: {

                            _id: {

                                $dateToString: {

                                    format: "%d-%m-%Y",

                                    date: "$expenses.createdAt"

                                }

                            },

                            total: {

                                $sum: "$expenses.amount"

                            }

                        }

                    },

                    {

                        $sort: {

                            _id: 1

                        }

                    }

                ]

            }

        }

    ]);

    if (!dashboard.length) {

        return res.status(404).json({

            success: false,

            message: "Trip not found."

        });

    }

    return res.status(200).json({

        success: true,

        dashboard: dashboard[0]

    });

};

module.exports = {

    createTrip,

    getTrips,

    getTripById,

    updateTrip,

    deleteTrip,

    getTripDashboard

};