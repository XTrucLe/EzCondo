import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export { UserProps, getUserInfo, updateProfile };

type UserProps = {
  fullName: string;
  email?: string;
  citizenIdentity?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  roleName?: string;
  status?: string;
  apartmentNumber?: string;
  avatar?: string;
};

const getUserInfo = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.user?.getInfo,
    });

    if (!response) {
      return { error: "Request failed" };
    }

    const { data, error } = response;

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    throw new Error(error as any);
  }
};

const updateProfile = async (data: any) => {
  try {
    const response = await request({
      method: "put",
      url: endpoints.user?.updateProfile,
      data,
    });

    if (!response) {
      return { error: "Request failed" };
    }

    const { data: responseData, error } = response;

    if (error) {
      return { error };
    }

    return { data: responseData };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const regisFCMToken = async (
  fcmToken: string,
  deviceType: string,
  status: boolean
) => {
  try {
    const response = await request({
      method: "post",
      url: endpoints.user?.regisFCMToken,
      data: { fcmToken, deviceType, status },
    });

    if (!response) {
      return { error: "Request failed" };
    }

    const { data, error } = response;

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    throw new Error(error as any);
  }
};
