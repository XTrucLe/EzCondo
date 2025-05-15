import { endpoints } from "@/constants/Endpoints";
import { request } from "./apiService";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";

export const handleReadNotice = async (id: string) => {
  try {
    await request({
      method: "post",
      url: endpoints.notification.readNotification,
      data: {
        notificationIds: [id],
      },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const getNotification = async () => {
  try {
    const response = await request({
      method: "get",
      url: endpoints.notification.getNotification,
    });
    let notifications: NotificationBoxType[] = response.data.notifications;

    const notificationsWithImages = await Promise.all(
      notifications.map(async (notification) => {
        const responseImage = await getNoticeImages(notification.id);

        const images = responseImage.map((item: any) => item.image); // sửa ở đây

        return {
          ...notification,
          images, // bạn nên dùng "images" (số nhiều) nếu là mảng
        };
      })
    );
    console.log("Notifications with images:", notificationsWithImages);
    return notificationsWithImages;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};

export const getNoticeImages = async (id: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.notification.getNoticeImages}?notificationId=${id}`,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching notification images:", error);
    return null;
  }
};
