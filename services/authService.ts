import { request } from "./apiService";

const forgotPasswordRequest = async (email: string) => {
  return await request({
    method: "post",
    url: "/auth/forgot-password",
    data: { email },
  });
};
export { forgotPasswordRequest };
