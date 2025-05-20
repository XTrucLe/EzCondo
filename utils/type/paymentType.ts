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

