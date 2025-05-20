import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";
import { fetchUserInfo } from "./authService";

export { getUserInfo, updateProfile };

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
    console.log(data);

    return { data };
  } catch (error) {
    throw new Error(error as any);
  }
};
const updateProfile = async (data: any) => {
  try {
    const response = await request({
      method: "patch",
      url: endpoints.user?.updateProfile,
      data,
    });

    if (!response) {
      return { error: "Request failed" };
    }
    await fetchUserInfo();
    const { data: responseData, error } = response;

    if (error) {
      return { error };
    }

    return { data: responseData };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateAvatar = async (data: FormData) => {
  try {
    const response = await request({
      method: "post",
      url: endpoints.user?.updateAvatar,
      data,
    });

    if (!response) {
      return { error: "Request failed" };
    }
    await fetchUserInfo();

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
      data: { fcmToken: fcmToken, type: deviceType, isActive: status },
    });

    if (!response) {
      return { error: "Request failed" };
    }

    const { data, error } = response;
    console.log("Success regisFCMToken");

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const changePassword = async (
  oldpassword: string,
  newPassword: string
) => {
  try {
    const response = await request({
      method: "patch",
      url: endpoints.user?.changePassword,
      data: { oldPassword: oldpassword, newPassword: newPassword },
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
