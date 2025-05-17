export type ServiceStatus = "completed" | "pending" | "cancelled"; // giả định có thể có thêm trạng thái

export type RegisteredService = {
  id: string;
  serviceName: string;
  startDate: string; // ISO datetime string
  endDate: string;   // ISO datetime string
  status: ServiceStatus;
};