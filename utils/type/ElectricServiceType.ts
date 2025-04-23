export interface ElectricServiceRecord {
  fullName: string;
  phoneNumber: string;
  email: string;
  apartmentNumber: string;
  meterNumber: string;
  readingDate: string; // ISO date string
  pre_electric_number: number;
  current_electric_number: number;
  consumption: number;
  price: number;
  status: "pending" | "paid" | "overdue"; // Bạn có thể mở rộng thêm các trạng thái khác nếu có
}
