import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const paymentService = {
  createPayment: async (bookingId: string) => {
    try {
      const response = await request({
        method: "post",
        url: `${endpoints.payment.createPayment}?bookingId=${bookingId}`,
      });

      console.log("Payment response:", response.data);

      return response.data;
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

export const createWaterPayment = async (waterBillId: string) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.payment.createWaterPayment}?waterBillId=${waterBillId}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating water payment:", error);
    throw error;
  }
};

export const createElectricPayment = async (electricBillId: string) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.payment.createElectricPayment}?electricBillId=${electricBillId}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating electric payment:", error);
    throw error;
  }
};

export const createParkingPayment = async (parkingBillId: string) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.payment.createpParkingPayment}?paymentId=${parkingBillId}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating parking payment:", error);
    throw error;
  }
};

export const createServicePayment = async (serviceBillId: string) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.payment.createServicePayment}?serviceBillId=${serviceBillId}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating service payment:", error);
    throw error;
  }
};
export const getPaymentNeed = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.payment.getPaymentNeed,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching payment need:", error);
    throw error;
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.payment.getPaymentHistory,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};
