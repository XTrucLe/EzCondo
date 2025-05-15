import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const getWaterFee = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.water.getWaterFee,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch water fee");
    }
  } catch (error) {
    console.error("Error fetching water fee:", error);
    throw error;
  }
};
