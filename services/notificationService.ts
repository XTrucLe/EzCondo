import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";

export const handleReadNotice = async (id: string) => {
  try {
    await request({
      method: "post",
      url: endpoints.notification.readNotification,
      data: {
        id,
        isRead: true,
      },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

// const handleReadAllNotice = async () => {
//   try {
//     await request({
//       method: "post",
//       url: endpoints.notification.readAllNotification,
//     });
//   } catch (error) {
//     console.error("Error marking all notifications as read:", error);
//   }
// };

const getNotification = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.notification.getNotification,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};
