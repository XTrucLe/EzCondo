export type NotificationBoxType = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "notice" | "Fee" | "News";
  isRead: boolean;
  createBy: string;
  createAt: string;
};

export const fakeNotification: NotificationBoxType[] = [
  {
    id: "1",
    title: "Thông báo hệ thống",
    content: "Hệ thống sẽ bảo trì vào lúc 2 giờ sáng ngày mai.",
    date: "2025-03-31",
    type: "notification",
    isRead: false,
    createBy: "Admin",
    createAt: "2025-03-30 14:00",
  },
  {
    id: "2",
    title: "Hóa đơn tháng 3",
    content: "Hóa đơn tiền điện tháng 3 đã sẵn sàng để thanh toán.",
    date: "2025-03-29",
    type: "fee",
    isRead: true,
    createBy: "Billing System",
    createAt: "2025-03-29 08:00",
  },
  {
    id: "3",
    title: "Tin tức mới",
    content: "Sắp có sự kiện giảm giá đặc biệt trong tháng 4!",
    date: "2025-03-28",
    type: "news",
    isRead: false,
    createBy: "Marketing Team",
    createAt: "2025-03-28 10:30",
  },
  {
    id: "4",
    title: "Nhắc nhở thanh toán",
    content: "Bạn còn 3 ngày để thanh toán hóa đơn trước khi bị phạt.",
    date: "2025-03-27",
    type: "fee",
    isRead: false,
    createBy: "Billing System",
    createAt: "2025-03-27 09:00",
  },
  {
    id: "5",
    title: "Cập nhật chính sách",
    content: "Chính sách sử dụng dịch vụ đã được cập nhật, vui lòng kiểm tra.",
    date: "2025-03-26",
    type: "notification",
    isRead: true,
    createBy: "Admin",
    createAt: "2025-03-26 15:45",
  },
  {
    id: "6",
    title: "Khuyến mãi đặc biệt",
    content: "Giảm giá 50% cho tất cả dịch vụ trong tuần này!",
    date: "2025-03-25",
    type: "news",
    isRead: false,
    createBy: "Marketing Team",
    createAt: "2025-03-25 12:00",
  },
  {
    id: "7",
    title: "Nhắc nhở họp",
    content: "Cuộc họp nội bộ sẽ diễn ra vào lúc 10:00 sáng mai.",
    date: "2025-03-24",
    type: "notification",
    isRead: true,
    createBy: "HR Department",
    createAt: "2025-03-24 09:30",
  },
  {
    id: "8",
    title: "Thanh toán hóa đơn",
    content: "Hóa đơn tháng 2 vẫn chưa được thanh toán, vui lòng kiểm tra.",
    date: "2025-03-23",
    type: "fee",
    isRead: false,
    createBy: "Billing System",
    createAt: "2025-03-23 07:45",
  },
  {
    id: "9",
    title: "Sự kiện cộng đồng",
    content: "Sự kiện từ thiện sẽ diễn ra vào ngày 5/4, hãy tham gia!",
    date: "2025-03-22",
    type: "news",
    isRead: true,
    createBy: "Community Team",
    createAt: "2025-03-22 16:20",
  },
  {
    id: "10",
    title: "Cảnh báo bảo mật",
    content: "Có một lần đăng nhập bất thường từ thiết bị mới.",
    date: "2025-03-21",
    type: "notification",
    isRead: false,
    createBy: "Security System",
    createAt: "2025-03-21 22:15",
  },
];
