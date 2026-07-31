import { Link } from "react-router-dom";

import {

    MapPin,

    Wallet,

    IndianRupee,

    Receipt,

    Pencil,

    Trash2,

    BarChart3

} from "lucide-react";

export default function TripCard({

    trip,

    onEdit,

    onDelete

}) {

    return (

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">

            <div className="p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            {trip.name}

                        </h2>

                        <div className="flex items-center gap-2 mt-2 text-gray-500">

                            <MapPin size={18} />

                            <span>

                                {trip.destination}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-8 space-y-4">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-gray-600">

                            <Wallet size={18} />

                            Budget

                        </div>

                        <span className="font-semibold">

                            ₹{trip.budget.toLocaleString()}

                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-red-500">

                            <IndianRupee size={18} />

                            Spent

                        </div>

                        <span className="font-semibold">

                            ₹{trip.totalSpent.toLocaleString()}

                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-green-600">

                            <IndianRupee size={18} />

                            Remaining

                        </div>

                        <span className="font-semibold">

                            ₹{trip.remainingBudget.toLocaleString()}

                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-blue-600">

                            <Receipt size={18} />

                            Expenses

                        </div>

                        <span className="font-semibold">

                            {trip.expenseCount}

                        </span>

                    </div>

                </div>

            </div>

            <div className="bg-gray-50 border-t px-6 py-4 flex items-center justify-between">

                <Link

                    to={`/trip/${trip._id}`}

                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"

                >

                    <BarChart3 size={18} />

                    Dashboard

                </Link>

                <div className="flex gap-3">

                    <button

                        onClick={() => onEdit(trip)}

                        className="p-2 rounded-xl bg-yellow-100 hover:bg-yellow-200 transition"

                    >

                        <Pencil

                            size={18}

                            className="text-yellow-700"

                        />

                    </button>

                    <button

                        onClick={() => onDelete(trip._id)}

                        className="p-2 rounded-xl bg-red-100 hover:bg-red-200 transition"

                    >

                        <Trash2

                            size={18}

                            className="text-red-600"

                        />

                    </button>

                </div>

            </div>

        </div>

    );

}