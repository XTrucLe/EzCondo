import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import QRCodeScreen from "@/screens/payment/QRCode";
import PaymentHistoryScreen from "@/screens/payment/PaymentHistoryScreen";
import PaymentWaitingScreen from "@/screens/payment/PaymentWaitingScreen";
import PaymentDetailScreen from "@/screens/payment/PaymentHistoryDetailScreen";
import DetailPaymentFee from "@/screens/fee/OtherFeeScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function PaymentNavigation() {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="QRCode" component={QRCodeScreen} />
      <Stacks.Screen name="PaymentWaiting" component={PaymentWaitingScreen} />
      <Stacks.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stacks.Screen
        name="PaymentHistoryDetail"
        component={PaymentDetailScreen}
      />
      <Stacks.Screen name="DetailPaymentFee" component={DetailPaymentFee} />
    </Stacks.Navigator>
  );
}
