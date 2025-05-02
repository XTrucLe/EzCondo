import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const paymentService = {
  createPayment: async (bookingId: string) => {
    try {
      const response = await request({
        method: "post",
        url: `${endpoints.payment.createPayment}?bookingId=${bookingId}`,
      });

      return response;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  },
};

export const checkStatusPayment = async (paymentId: string) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.payment.checkStatusPayment}?paymentId=${paymentId}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
