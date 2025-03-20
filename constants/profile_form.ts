export const profileFields = [
  { label: "🧑 Họ và tên:", name: "fullName", isEdit: true, type: "text" },
  { label: "📄 CMND/CCCD:", name: "citizenNumber", isEdit: true, type: "text" },
  { label: "📅 Ngày sinh:", name: "dateOfBirth", isEdit: true, type: "date" },
  {
    label: "✉️ Email:",
    name: "email",
    keyboardType: "email-address",
    isEdit: false,
    type: "text",
  },
  {
    label: "⚧ Giới tính:",
    name: "gender",
    isEdit: true,
    type: "dropdown",
    options: ["Nam", "Nữ", "Khác"],
  },
  {
    label: "📞 Số điện thoại:",
    name: "phoneNumber",
    keyboardType: "phone-pad",
    isEdit: true,
    type: "text",
  },
  { label: "🏠 Căn hộ:", name: "apartmentNumber", isEdit: false, type: "text" },
];
