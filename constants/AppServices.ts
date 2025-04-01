import { ServiceDetailType } from "@/utils/type/serviceDetailType";

export const SERVICES = [
  {
    id: 1,
    name: "Bơi lội",
    category: "Thể thao",
    icon: "water-outline",
    onPress: (navigation: any) => navigation.navigate("swimming" as never),
  },
  {
    id: 2,
    name: "Bãi đậu xe",
    category: "Giao thông",
    icon: "car-outline",
    onPress: () => console.log("Bãi đậu xe được chọn"),
  },
  {
    id: 3,
    name: "Phòng gym",
    category: "Thể thao",
    icon: "barbell-outline",
    onPress: () => console.log("Phòng gym được chọn"),
  },
  {
    id: 4,
    name: "Điện nước",
    category: "Tiện ích",
    icon: "flash-outline",
    onPress: (navigation: any) => navigation.navigate("bill" as never),
  },
  {
    id: 5,
    name: "Quản lý cư dân",
    category: "Cư dân",
    icon: "people-outline",
    onPress: (navigation: any) =>
      navigation.navigate("apartmentMember" as never),
  },
  {
    id: 6,
    name: "Phí dịch vụ",
    category: "Tài chính",
    icon: "wallet-outline",
    onPress: (navigation: any) =>
      navigation.navigate("detail", { service: "fee" }),
  },
  {
    id: 7,
    name: "Bảo trì & Sửa chữa",
    category: "Hạ tầng",
    icon: "build-outline",
    onPress: () => console.log("Bảo trì & Sửa chữa được chọn"),
  },
  {
    id: 8,
    name: "An ninh & Giám sát",
    category: "An ninh",
    icon: "shield-checkmark-outline",
    onPress: () => console.log("An ninh & Giám sát được chọn"),
  },
  {
    id: 9,
    name: "Quản lý đặt chỗ",
    category: "Tiện ích",
    icon: "calendar-outline",
    onPress: () => console.log("Quản lý đặt chỗ được chọn"),
  },
] as const;

export const fakeData: ServiceDetailType[] = [
  {
    id: "as4qw8",
    name: "Bể bơi",
    description:
      "Bể bơi trong nhà với nước sạch và an toàn cho sức khỏe. Giờ mở cửa từ 6h đến 22h hàng ngày.",
    images: [
      { id: "1", image: "https://example.com/pool.jpg" },
      { id: "2", image: "https://example.com/pool2.jpg" },
    ],
    price: [
      { name: "Giá vé người lớn", price: 50000 },
      { name: "Giá vé trẻ em", price: 30000 },
    ],
    status: "active",
  },
];
