import { MemberType } from "@/utils/type/memberType";
import { request } from "./apiService";
import { endpoints } from "@/constants/Endpoints";

export const ApartmentMembers: MemberType[] = [
  {
    id: 1,
    fullName: "Lê Minh Hoàng",
    dateOfBirth: "1992-03-18",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    gender: "Male",
    email: "minhhoang@example.com",
    relationship: "Chủ hộ",
  },
  {
    id: 2,
    fullName: "Nguyễn Thị Lan",
    dateOfBirth: "1995-07-22",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    gender: "Female",
    email: "thilan@example.com",
    relationship: "Vợ",
  },
  {
    id: 3,
    fullName: "Trần Văn Đức",
    dateOfBirth: "1988-11-05",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    gender: "Male",
    email: "vanduc@example.com",
    relationship: "Anh trai",
  },
  {
    id: 4,
    fullName: "Phạm Hải Yến",
    dateOfBirth: "2000-02-10",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    gender: "Female",
    email: "haiyen@example.com",
    relationship: "Em gái",
  },
  {
    id: 5,
    fullName: "Hoàng Tuấn Anh",
    dateOfBirth: "1997-09-30",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    gender: "Male",
    email: "tuananh@example.com",
    relationship: "Bạn cùng phòng",
  },
  {
    id: 6,
    fullName: "Vũ Thị Mai",
    dateOfBirth: "1994-12-15",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    gender: "Female",
    email: "thimai@example.com",
    relationship: "Chị họ",
  },
];

export const getServices = async (serviceId: string) => {
  try {
    const response = await request({
      method: "get",
      url: `${endpoints.service.getServices}?serviceId=${serviceId}`,
    });
  } catch (error) {
    console.log();
  }
};
