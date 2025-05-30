import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const getMembers = async () => {
  try {
    const response = await request({
      url: endpoints.household.getHousehold,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching members:", error);
  }
};
