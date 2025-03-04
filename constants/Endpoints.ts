const HOST = process.env.EXPO_PUBLIC_API_HOST as string;
export const endpoints = {
  login: `${HOST}/auth/login`,
  register: `${HOST}/auth/register`,
  forgotPassword: `${HOST}/auth/forgot-password`,
  resetPassword: `${HOST}/auth/reset-password`,
  verifyEmail: `${HOST}/auth/verify-email`,
  updateProfile: `${HOST}/auth/update-profile`,
  updatePassword: `${HOST}/auth/update-password`,
  getProfile: `${HOST}/auth/profile`,
};
