export type UserInfoProps = {
  id: string;
  fullName: string;
  no?: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  avatar?: string;
  role?: string;
  apartmentNumber?: string;
  status?: string;
};

export const formFields = {
  fullName: {
    label: "fullName",
    type: "text",
    isEdit: true,
  },
  no: {
    label: "no",
    type: "text",
    isEdit: false,
  },
  email: {
    label: "email",
    type: "text",
    isEdit: false,
  },
  gender: {
    label: "gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    isEdit: true,
  },
  dateOfBirth: {
    label: "dateOfBirth",
    type: "date",
    isEdit: true,
  },
  phoneNumber: {
    label: "phoneNumber",
    type: "number",
    isEdit: true,
  },
  apartmentNumber: {
    label: "apartmentNumber",
    type: "text",
    isEdit: false,
  },
  status: {
    label: "status",
    type: "text",
    isEdit: false,
  },
};
