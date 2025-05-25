import { RegisteredService } from "@/utils/type/bookingType";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import { PaymentType } from "@/utils/type/paymentType";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";

export type RootStackParamList = {
  // ==================Main Screen==================

  // ==================Services Screen==================
  ResidentServices: undefined;
  ServiceOverview: undefined;
  ServiceUsing: undefined;
  ServiceUsingDetail: { serviceData: RegisteredService };
  ServiceDetail: { serviceDetail: ServiceDetailType };
  ServiceRegistration: { serviceInfo: ServiceDetailType };
  ServiceHistory: undefined;

  // ==================Notification Screen==================
  NotificationOverview: undefined;
  NotificationDetail: { selectedNotification?: NotificationBoxType };

  // ==================Payment Screen==================
  Payment: { screen: string; params?: any };
  QRCode: { serviceData: PaymentType };
  PaymentWaiting: undefined;
  PaymentHistory: undefined;
  PaymentHistoryDetail: undefined;

  // ==================Profile Screen==================
  Profile: { screem: string; params?: any };
  ProfileOverview: undefined;
  ProfileEdit: undefined;

  // ==================Auth Screen==================
  login: undefined;
  ChangePassword: undefined;

  // ==================Home Screen==================
  // ==================Parking Screen==================
  ParkingOverview: undefined;
  ParkingRegistration: undefined;

  // ==================Booking Screen==================
  // ==================Incident Screen==================
  Incident: { screem: string; params?: any };
  IncidentCreate: undefined;
  IncidentHistory: undefined;
  // ==================Other Screen==================
  Setting: undefined;
  NotFound: undefined;
  Feedback: undefined;
};
