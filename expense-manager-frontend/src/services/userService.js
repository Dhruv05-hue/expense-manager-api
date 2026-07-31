import api from "./api";

export const getProfile = () => {
  return api.get("/user/profile");
};

export const updateProfile = (data) => {
  return api.put("/user/profile", data);
};

// NEW
export const sendChangePasswordOTP = (data) => {
  return api.post("/user/change-password/send-otp", data);
};

export const changePassword = (data) => {
  return api.put("/user/change-password", data);
};

export const deleteAccount = () => {
  return api.delete("/user/delete");
};