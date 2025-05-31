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
};

export type UserInfoFormProps = {
  fullName: string;
  apartmentNumber?: string;
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
};

[
  {
    createDate: "2025-05-17T05:46:49.813",
    endDate: "2025-06-17T05:46:36.677",
    id: "7f793f62-6545-4c6b-ad68-5161007357be",
    method: "VietQR",
    price: 5000,
    serviceId: "48fe711b-aad3-4406-9e90-94231c7efb33",
    serviceName: "Pool",
    startDate: "2025-05-17T05:46:49.26",
    status: "in_use",
  },
];
