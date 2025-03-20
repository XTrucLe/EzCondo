// Description: All the endpoints of the API are defined here.
// Instructions: Replace the following code with the code snippet given above.

const API_BASE = "/api";

export const endpoints = {
  auth: {
    login: `${API_BASE}/Auth/login`,
    logout: `${API_BASE}/Auth/logout`,
    forgotPassword: `${API_BASE}/Auth/forgot-password`,
    resetPassword: `${API_BASE}/Auth/reset-password`,
    verifyEmail: `${API_BASE}/Auth/verify-email`,
    verifyOTP: `${API_BASE}/Auth/verify-otp`,
    updatePassword: `${API_BASE}/Auth/update-password`,
  },

  user: {
    getInfo: `${API_BASE}/User/get-infor-me`,
    updateProfile: `${API_BASE}/User/edit-infor-me`,
    updateAvatar: `${API_BASE}/User/add-or-update-avatar`,
  },
};
