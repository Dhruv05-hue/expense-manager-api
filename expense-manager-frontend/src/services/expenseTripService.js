import api from "./api";

export const createTrip = async (data) => {

    const response = await api.post(

        "/expense-trip",

        data

    );

    return response.data;

};


export const getTrips = async () => {

    const response = await api.get(

        "/expense-trip"

    );

    return response.data;

};


export const getTripById = async (id) => {

    const response = await api.get(

        `/expense-trip/${id}`

    );

    return response.data;

};


export const updateTrip = async (id, data) => {

    const response = await api.put(

        `/expense-trip/${id}`,

        data

    );

    return response.data;

};


export const deleteTrip = async (id) => {

    const response = await api.delete(

        `/expense-trip/${id}`

    );

    return response.data;

};


export const getTripDashboard = async (id) => {

    const response = await api.get(

        `/expense-trip/dashboard/${id}`

    );

    return response.data;

};