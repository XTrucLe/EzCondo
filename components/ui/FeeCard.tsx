import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";
import { ElectricFee, WaterFee } from "@/utils/type/FeeType";
import { formatVND } from "@/hooks/useFormat";
import useDateUtils from "@/hooks/useDateUtils";

type Props = {
  item: ElectricFee | WaterFee;
  mode: "electric" | "water";
};

const FeeCard = ({ item, mode }: Props) => {
  const navigation = useNavigation<any>();
  const { formatDate } = useDateUtils();
  const { translation } = useLanguage.getState();
  const paid = item.status === "paid";
  console.log(mode);

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
      activeOpacity={0.85}
    >
      {/* Header: Icon + Title + Amount */}
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <View style={styles.iconWrap}>
            <Ionicons name={iconName} size={18} color="#ffffff" />
          </View>
          <Text style={styles.title}>{typeLabel}</Text>
        </View>
        <Text style={styles.amount}>{formatVND(amount)}</Text>
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
          <Text
            style={[
              styles.badgeText,
              paid ? { color: "#2ecc71" } : { color: "#e74c3c" },
            ]}
          >
            {paid ? translation.paid : translation.unpaid}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {paid ? translation.paidDate : translation.dueDate}:{" "}
          {formatDate(new Date(item.paymentTerm))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardUnpaid: {
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c33", // light red
  },
  cardPaid: {
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc7133", // light green
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e88e5",
  },
  subInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 14,
    lineHeight: 20,
  },
  highlight: {
    color: "#333",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
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
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
});
