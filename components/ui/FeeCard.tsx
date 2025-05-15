import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";
import { ElectricFee, WaterFee } from "@/utils/type/FeeType";

type Props = {
  item: ElectricFee | WaterFee;
  mode: "electric" | "water";
};

const FeeCard = ({ item, mode }: Props) => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage.getState();
  const paid = item.status === "paid";

  const iconName = mode === "water" ? "water" : "flash";
  const typeLabel =
    (mode === "water" ? translation.waterFee : translation.electricFee) +
    " " +
    translation.month.toLowerCase() +
    " " +
    (new Date(item.paymentTerm).getMonth() + 1) +
    "/" +
    new Date(item.paymentTerm).getFullYear();
  const amount = item.price;
  const owner = item.fullName;
  const room = item.apartmentNumber;

  return (
    <TouchableOpacity
      style={[styles.card, paid ? styles.cardPaid : styles.cardUnpaid]}
      onPress={() => navigation.navigate("feeDetail", { item, mode })}
      activeOpacity={0.8}
    >
      {/* Header: Icon + Title + Amount */}
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Ionicons name={iconName} size={24} color="#4A90E2" />
          <Text style={styles.title}>{typeLabel}</Text>
        </View>
        <Text style={styles.amount}>{amount.toLocaleString()}₫</Text>
      </View>

      {/* Sub-info: Room & Owner */}
      <Text style={styles.subInfo}>
        {translation.room}: <Text style={styles.highlight}>{room}</Text>
        {"\n"}
        {translation.owner}: <Text style={styles.highlight}>{owner}</Text>
      </Text>

      {/* Footer: Status badge & Due/Paid Date */}
      <View style={styles.footer}>
        <View
          style={[styles.badge, paid ? styles.badgePaid : styles.badgeUnpaid]}
        >
          <Text style={styles.badgeText}>
            {paid ? translation.paid : translation.unpaid}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {paid ? translation.paidDate : translation.dueDate}:{" "}
          {item.paymentTerm}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardUnpaid: {
    backgroundColor: "#fff5f5",
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  cardPaid: {
    backgroundColor: "#f5fff9",
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e88e5",
  },
  subInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  highlight: {
    color: "#333",
    fontWeight: "500",
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  badgeUnpaid: {
    backgroundColor: "#fdecea",
  },
  badgePaid: {
    backgroundColor: "#e8f5e9",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
});
