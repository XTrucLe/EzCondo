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
  apartment: {
    getMyApartment: `${API_BASE}/Apartment/get-my-apartment`,
  },
  household: {
    getHousehold: `${API_BASE}/HouseHoldMember/get-my-house-hold-member`,
  },

  user: {
    getInfo: `${API_BASE}/User/get-infor-me`,
    updateProfile: `${API_BASE}/User/edit-infor-me`,
    updateAvatar: `${API_BASE}/User/add-or-update-avatar`,
    regisFCMToken: `${API_BASE}/User/add-or-update-fcm-token`,
    changePassword: `${API_BASE}/User/change-password`,
  },
  member: {
    getMembers: `${API_BASE}HouseHoldMember/get-my-house-hold-member`,
    addMember: `${API_BASE}/Household/add-member`,
    updateMember: `${API_BASE}/Household/update-member`,
    deleteMember: `${API_BASE}/Household/delete-member`,
  },
  notification: {
    getNotification: `${API_BASE}/Notification/user-get-notifications`,
    readNotification: `${API_BASE}/Notification/notifications/mark-as-read`,
  },

  fee: {
    getFee: `${API_BASE}/Fee/get-fee`,
    getFeeDetail: `${API_BASE}/Fee/get-fee-detail`,
    getFeeHistory: `${API_BASE}/Fee/get-fee-history`,
  },
  electric: {
    getElectricFee: `${API_BASE}/Electric/get-electric-fee`,
  },

  service: {
    getServices: `${API_BASE}/Services/get-services`,
    getServiceDetail: `${API_BASE}/Services/get-all-services`,
    getServiceImages: `${API_BASE}/Services/get-service-images`,
    getServiceHistory: `${API_BASE}/Services/get-service-history`,
    getServiceType: `${API_BASE}/Services/get-service-type`,
    postServiceRequest: `${API_BASE}/Services/post-service-request`,
  },
  incident: {
    getIncident: `${API_BASE}/Incident/get-my-incident`,
    sendIncident: `${API_BASE}/Incident/add-incident`,
    sendIncodentImage: `${API_BASE}/Incident/add-or-update-incident-image`,
    getIncidentHistory: `${API_BASE}/Incident/get-incident-history`,
  },
};
