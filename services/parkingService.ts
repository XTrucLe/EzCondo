import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const getMyParkingDetails = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.parking.getMyParking,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getParkingDetails = async (parkingId: string) => {
  console.log("Parking ID:", parkingId);

  try {
    const response = await request({
      method: "get",
      url: `${endpoints.parking.getCardsDetails}?parkingLotId=${parkingId}`,
    });

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const regisParking = async (noMoto?: number, noCar?: number) => {
  try {
    const response = await request({
      method: "post",
      url: endpoints.parking.requestParking,
      data: {
        numberOfMotorbikes: noMoto,
        numberOfCars: noCar,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};
