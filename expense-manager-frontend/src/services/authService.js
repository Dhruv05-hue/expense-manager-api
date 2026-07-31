import api from "./api";

export const signupUser = (data) => {
    return api.post("/user/signup", data);
};

export const loginUser = (data) => {
    return api.post("/user/login", data);
};

export const verifyOTP = (data) => {
    return api.post("/user/verifyotp", data);
};

export const resendOTP = (data) => {
    return api.post("/user/resendotp", data);
};

export const forgotPassword = (data) => {
    return api.post("/user/forgotpassword", data);
};

export const resetPassword = (data) => {
    return api.post("/user/resetpassword", data);
};