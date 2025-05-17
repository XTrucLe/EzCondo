export type PaymentType = {
  paymentId: string;
  accountNumber: string;
  accountOwner: string;
  amount: string;
  description: string;
  qrCode: string;
};

export type PaymentHistoryType = {
  id: number;
  fullname: string;
  apartmentNumber: string;
  type: "electric" | "water" | "service";
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  transactionId?: string;
  createDate: string;
  readingDate?: string;
  totalComsumption?: number;
  meterNumber?: string;
  serviceName?: string;
  serviceStartDate?: string;
  serviceEndDate?: string;
  servicePrice?: number;
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
