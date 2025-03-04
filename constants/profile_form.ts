export const profileFields = [
  { label: "🧑 Họ và tên:", name: "name", isEdit: true },
  { label: "📄 CMND/CCCD:", name: "citizen_identity", isEdit: true },
  { label: "📅 Ngày sinh:", name: "date_of_birth", isEdit: true },
  {
    label: "✉️ Email:",
    name: "email",
    keyboardType: "email-address",
    isEdit: false,
  },
  {
    label: " ⚧ Giới tính:",
    name: "gender",
    keyboardType: "gender",
    isEdit: true,
  },
  {
    label: "📞 Số điện thoại:",
    name: "phone_number",
    keyboardType: "phone-pad",
    isEdit: true,
  },
  { label: "🏠 Căn hộ:", name: "apartment_number", isEdit: false },
];
