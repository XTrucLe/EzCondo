import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const createBooking = async (bookingData: any) => {
  try {
    const response = await request({
      method: "post",
      url: endpoints.booking.createBooking,
      data: bookingData,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
