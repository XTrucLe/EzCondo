export type PaymentType = {
  paymentId: string;
  accountNumber: string;
  accountOwner: string;
  amount: string;
  description: string;
  qrCode: string;
};

export type PaymentHistoryType = {
  amount: number;
  apartmentNumber: string;
  createDate: string; 
  fullName: string;
  paymentId: string;
  status: "completed" | "pending" | "failed"| "overdue"; 
  type: string; 
};

export type PaymentStatus = "completed" | "pending" | "failed"; // Có thể mở rộng
export type PaymentTypeCategory = "Booking" | "Electric" | "Water" | "Parking"; // Có thể mở rộng

export type PaymentWaitingType = {
  amount: number;
  apartmentNumber: string;
  title?: string;
  fullName: string;
  paymentId: string;
  createDate: string; // ISO datetime string
  status: PaymentStatus;
  type: PaymentTypeCategory;

  // Các ID liên quan tới từng loại dịch vụ
  bookingId?: string | null;
  electricId?: string | null;
  waterId?: string | null;
  parkingId?: string | null;
};

[
  {
    amount: 5000,
    apartmentNumber: "102",
    createDate: "2025-05-17T05:46:49.813",
    fullName: "Lê Xuân Trúc",

    paymentId: "c3aaacb4-6943-415a-976c-5d799a6287fd",
    status: "completed",
    type: "Booking Pool",
  },
];
