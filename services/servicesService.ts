import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { request } from "./apiService";
import { endpoints } from "@/constants/Endpoints";
import { getMyBooking } from "./bookingService";

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

// Lấy danh sách dịch vụ theo tên và trạng thái
const fetchServices = async (
  serviceName?: string
): Promise<ServiceDetailType[]> => {
  const url = `${endpoints.service.getServiceDetail}?serviceName=${
    serviceName ?? ""
  }&status=true`;
  const response = await request({ method: "get", url });
  return response.data;
};

// Lấy danh sách dịch vụ đã đặt
const fetchBookedServices = async (): Promise<any[]> => {
  return await getMyBooking();
};

// Lọc dịch vụ chưa được đặt (loại bỏ các dịch vụ đã đặt)
const filterUnusedServices = (
  allServices: ServiceDetailType[],
  bookedServices: any[]
): ServiceDetailType[] => {
  const usedServiceNames = new Set(
    bookedServices.map((item) => item.serviceName.toLowerCase())
  );
  // ["Laundry", "Children", "Fitness", "Steam room", "Pool"].forEach((item) => {
  //   usedServiceNames.add(item.toLowerCase());
  // });
  return allServices.filter(
    (service) => !usedServiceNames.has(service.serviceName.toLowerCase())
  );
};

// Thêm ảnh cho mỗi dịch vụ
const attachImagesToServices = async (
  services: ServiceDetailType[]
): Promise<ServiceDetailType[]> => {
  return await Promise.all(
    services.map(async (service) => {
      const images = await getServiceImages(service.id);
      return { ...service, images };
    })
  );
};

// Hàm chính tổng hợp
export const getServiceDetailAndImage = async (serviceName?: string) => {
  try {
    const allServices = await fetchServices(serviceName);
    const bookedServices = await fetchBookedServices();
    const unusedServices = filterUnusedServices(allServices, bookedServices);
    const servicesWithImages = await attachImagesToServices(unusedServices);
    return servicesWithImages;
  } catch (error) {
    console.error("Error in getServiceDetailAndImage:", error);
    return [];
  }
};

export const getServiceImages = async (serviceId: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.service.getServiceImages}?serviceId=${serviceId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBookingStatus = async (serviceId: string) => {
  try {
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllOtherService = async () => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.otherService.getAllService}`,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
