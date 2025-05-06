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
