export interface User {
  id: string;
  regency: string;
  fullName: string;
  email: string;
  dateOfBirth: string; // Có thể dùng Date nếu xử lý dạng ngày
  gender: "Male" | "Female";
  phoneNumber: string;
  avatar: string;
}

export interface Member {
  id: string;
  no: string;
  fullName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  phoneNumber: string;
  relationship: "Son" | "Wife" | "Husband" | "Daughter" | string;
}

export interface UserWithMembers {
  user: User;
  members: Member[];
}
