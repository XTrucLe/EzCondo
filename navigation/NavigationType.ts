import { IncidentType } from "@/components/ui/IncidentBox";
import { RegisteredService } from "@/utils/type/bookingType";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import { PaymentType } from "@/utils/type/paymentType";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";

export type RootStackParamList = {
  // ==================Auth Screens==================
  login: undefined;
  ChangePassword: undefined;

  // ==================Home Screens==================
  Home: undefined;

  // ==================Profile Screens==================
  Profile: { screem: string; params?: any };
  ProfileOverview: undefined;
  ProfileEdit: undefined;

  // ==================Services Screens==================
  Service: { screen: string; params?: any };
  ResidentServices: undefined;
  ServiceOverview: undefined;
  ServiceUsing: undefined;
  ServiceUsingDetail: { serviceData: RegisteredService };
  ServiceDetail: { serviceDetail: ServiceDetailType };
  ServiceRegistration: { serviceInfo: ServiceDetailType };
  ServiceHistory: undefined;
  ServiceHome: { serviceName: string };

  // ==================Notification Screens==================
  NotificationOverview: undefined;
  NotificationDetail: { selectedNotification?: NotificationBoxType };

  // ==================Payment Screens==================
  Payment: { screen: string; params?: any };
  QRCode: { serviceData: PaymentType };
  PaymentWaiting: undefined;
  PaymentHistory: undefined;
  PaymentHistoryDetail: undefined;
  DetailPaymentFee: { screen: string; params?: any }; // Add or adjust as needed

  // ==================Fee Screens==================
  Fee: undefined;
  FeeOverview: undefined;
  FeeDetail: { feeId: string }; // Add or adjust as needed
  FeeHistory: undefined;
  OtherFee: undefined;
  UtilityBill: undefined;
  UtilityBillDetail: { billId?: string; mode?: "electric" | "water" }; // Add or adjust as needed

  // ==================Parking Screens==================
  Parking: undefined;
  ParkingOverview: undefined;
  ParkingRegistration: undefined;

  // ==================Booking Screens==================
  Booking: undefined;
  BookingOverview: undefined;
  BookingDetail: { bookingId: string }; // Add or adjust as needed

  // ==================Incident Screens==================
  Incident: { screem: string; params?: any };
  IncidentCreate: undefined;
  IncidentHistory: undefined;
  IncidentHistoryDetail: { incidentDetail: IncidentType };

  // ==================Support Screens==================
  Support: undefined;

  // ==================Apartment Screens==================
  Apartment: undefined;
  ApartmentMember: undefined;

  // ==================Chatbot Screens==================
  Chatbot: undefined;
  ChatbotHome: undefined;
  Chatting: undefined;
  ChatbotDetail: { chatId: string; name: string };

  // ==================Other Screens==================
  Setting: undefined;
  NotFound: undefined;
  Feedback: undefined;
};
