// BankLinking.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from "react-native";

interface BankConfig {
  name: string;
  iosScheme: string;
  androidPackage: string;
  iosAppStore: string;
  androidPlayStore: string;
}

const bankConfigs: BankConfig[] = [
  {
    name: "Techcombank",
    iosScheme: "tcbbank://",
    androidPackage: "com.techcombank.mobile",
    iosAppStore: "https://apps.apple.com/app/techcombank/idXXXXXXXXX",
    androidPlayStore: "market://details?id=com.techcombank.mobile",
  },
  {
    name: "Vietcombank",
    iosScheme: "vcbbank://",
    androidPackage: "com.vietcombank.fieldglass",
    iosAppStore: "https://apps.apple.com/app/vietcombank/idXXXXXXXXX",
    androidPlayStore: "market://details?id=com.vietcombank.fieldglass",
  },
  {
    name: "VPBank",
    iosScheme: "vpbank://",
    androidPackage: "com.vietcapital.vpbank",
    iosAppStore: "https://apps.apple.com/app/vpbank/idXXXXXXXXX",
    androidPlayStore: "market://details?id=com.vietcapital.vpbank",
  },
];

export async function openBankApp(bankName: string) {
  const cfg = bankConfigs.find((b) => b.name === bankName);
  if (!cfg) {
    Alert.alert("Không hỗ trợ ngân hàng này");
    return;
  }

  if (Platform.OS === "ios") {
    const url = cfg.iosScheme;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(cfg.iosAppStore);
    }
  } else {
    const intentUrl = `intent://#Intent;package=${cfg.androidPackage};end`;
    const supported = await Linking.canOpenURL(intentUrl);
    if (supported) {
      await Linking.openURL(intentUrl);
    } else {
      await Linking.openURL(cfg.androidPlayStore);
    }
  }
}

export default function BankLinking() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mở App Ngân Hàng</Text>
      {bankConfigs.map((bank) => (
        <TouchableOpacity
          key={bank.name}
          style={styles.button}
          onPress={() => openBankApp(bank.name)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{bank.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 16,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
