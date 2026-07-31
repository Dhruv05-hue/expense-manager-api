import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TripCard from "../../components/trip/TripCard";
import TripModal from "../../components/trip/TripModal";

import {
    getTrips,
    createTrip,
    updateTrip,
    deleteTrip
} from "../../services/expenseTripService";

export default function TripPage() {

    const [trips, setTrips] = useState([]);

    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const [selectedTrip, setSelectedTrip] = useState(null);

    const loadTrips = async () => {

        try {

            setLoading(true);

            const response = await getTrips();

            setTrips(response.trips || []);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTrips();

    }, []);

    const handleCreate = () => {

        setSelectedTrip(null);

        setOpenModal(true);

    };

    const handleEdit = (trip) => {

        setSelectedTrip(trip);

        setOpenModal(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this trip?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteTrip(id);

            loadTrips();

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleSubmit = async (data) => {

        try {

            if (selectedTrip) {

                await updateTrip(

                    selectedTrip._id,

                    data

                );

            }

            else {

                await createTrip(data);

            }

            setOpenModal(false);

            loadTrips();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <DashboardLayout>

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">

                        Expense Trips

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Manage all your travel expenses.

                    </p>

                </div>

                <button

                    onClick={handleCreate}

                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-lg transition hover:bg-blue-700"

                >

                    <Plus size={20} />

                    New Trip

                </button>

            </div>

            {

                loading ?

                    (

                        <div className="text-center py-20 text-gray-500">

                            Loading Trips...

                        </div>

                    )

                    :

                    trips.length === 0 ?

                        (

                            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">

                                <h2 className="text-2xl font-semibold">

                                    No Trips Yet

                                </h2>

                                <p className="mt-2 text-gray-500">

                                    Create your first expense trip.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                                {

                                    trips.map((trip) => (

                                        <TripCard

                                            key={trip._id}

                                            trip={trip}

                                            onEdit={handleEdit}

                                            onDelete={handleDelete}

                                        />

                                    ))

                                }

                            </div>

                        )

            }

            <TripModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onSubmit={handleSubmit}

                trip={selectedTrip}

            />

        </DashboardLayout>

    );

}