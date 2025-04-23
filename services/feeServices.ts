import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const getElectricFees = async () => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.electric.getElectricFee}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
