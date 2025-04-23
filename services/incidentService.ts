import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const sendIncident = async (incident: any) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.incident.sendIncident}`,
      data: incident,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendIncidentImage = async (form: FormData) => {
  try {
    const response = await request({
      method: "post",
      url: `${endpoints.incident.sendIncodentImage}`,
      data: form,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getIncident = async () => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.incident.getIncident}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
