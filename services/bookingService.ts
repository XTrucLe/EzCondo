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

export const getMyBooking = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.booking.getMyBooking,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const checkHadBooking = async (serviceName: string) => {
  try {
    const regisService = await getMyBooking();
    const hadBooking = regisService.some(
      (item: any) => item.serviceName === serviceName
    );
    return hadBooking;
  } catch (error) {
    console.error("Error checking booking:", error);
    throw error;
  }
};
