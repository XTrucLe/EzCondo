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
export const getIncidentHistory = async () => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.incident.getIncident}`,
    });
    console.log("Response from getIncidentHistory:", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIncidentImage = async (incidentId: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.incident.getIncidentImage}?incidentId=${incidentId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
