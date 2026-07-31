import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialState = {
    name: "",
    destination: "",
    budget: "",
    startDate: "",
    endDate: ""
};

export default function TripModal({

    open,
    onClose,
    onSubmit,
    trip

}) {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (trip) {

            setFormData({

                name: trip.name || "",

                destination: trip.destination || "",

                budget: trip.budget || "",

                startDate: trip.startDate
                    ? trip.startDate.slice(0, 10)
                    : "",

                endDate: trip.endDate
                    ? trip.endDate.slice(0, 10)
                    : ""

            });

        }

        else {

            setFormData(initialState);

        }

    }, [trip, open]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            !formData.name ||

            !formData.destination ||

            !formData.budget ||

            !formData.startDate ||

            !formData.endDate

        ) {

            alert("Please fill all fields.");

            return;

        }

        if (

            new Date(formData.endDate) <

            new Date(formData.startDate)

        ) {

            alert("End date cannot be before start date.");

            return;

        }

        await onSubmit({

            ...formData,

            budget: Number(formData.budget)

        });

    };

    if (!open) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl animate-fadeIn">

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <h2 className="text-2xl font-bold text-gray-800">

                        {trip ? "Edit Trip" : "Create New Trip"}

                    </h2>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 hover:bg-gray-100"

                    >

                        <X size={22} />

                    </button>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-6 p-6"

                >

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">

                            Trip Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            placeholder="Goa Vacation"

                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">

                            Destination

                        </label>

                        <input

                            type="text"

                            name="destination"

                            value={formData.destination}

                            onChange={handleChange}

                            placeholder="Goa"

                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">

                            Budget (₹)

                        </label>

                        <input

                            type="number"

                            name="budget"

                            value={formData.budget}

                            onChange={handleChange}

                            placeholder="50000"

                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500"

                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">

                                Start Date

                            </label>

                            <input

                                type="date"

                                name="startDate"

                                value={formData.startDate}

                                onChange={handleChange}

                                className="w-full rounded-xl border border-gray-300 px-4 py-3"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">

                                End Date

                            </label>

                            <input

                                type="date"

                                name="endDate"

                                value={formData.endDate}

                                onChange={handleChange}

                                className="w-full rounded-xl border border-gray-300 px-4 py-3"

                            />

                        </div>

                    </div>

                    <div className="flex justify-end gap-4 pt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

                        >

                            {trip ? "Update Trip" : "Create Trip"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}