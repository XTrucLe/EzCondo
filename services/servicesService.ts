import { request } from "./apiService";
import { endpoints } from "@/constants/Endpoints";

export const getServices = async () => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.service.getServices}`,
    });
    return response.data;
  } catch (error) {
    console.log();
  }
};

export const getServiceDetail = async (serviceName?: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.service.getServiceDetail}?serviceName=${
        serviceName ? serviceName : ""
      }&status=true`,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceImages = async (serviceId: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.service.getServiceImages}?serviceId=${serviceId}`,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
