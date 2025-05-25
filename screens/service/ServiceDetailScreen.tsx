import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { formatVND } from "@/hooks/useFormat";
import { SlideShow } from "@/components/ui/SlideShow";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigation } from "expo-router";
import { useAppNavigator } from "@/navigation/useAppNavigate";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const { serviceDetail } = useRoute().params as {
    serviceDetail: ServiceDetailType;
  };
  const { navigate } = useAppNavigator();
  const { translation } = useLanguage.getState();

  const onRegister = () => {
    navigate("ServiceRegistration", {
      serviceInfo: serviceDetail,
    });
  };
  return (
    <ScrollView style={styles.container}>
      {serviceDetail.images && serviceDetail.images.length > 0 && (
        <SlideShow
          item={serviceDetail.images}
          key={serviceDetail.id}
          time={6000}
        />
      )}

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{serviceDetail.serviceName}</Text>
          <View
            style={[
              styles.statusBadge,
              serviceDetail.status === "active"
                ? styles.activeBadge
                : styles.inactiveBadge,
            ]}
          >
            <Icon
              name={
                serviceDetail.status === "active"
                  ? "check-circle"
                  : "close-circle"
              }
              size={16}
              color="#fff"
            />
            <Text style={styles.statusText}>
              {serviceDetail.status === "active"
                ? translation.statusActive
                : translation.statusInactive}
            </Text>
          </View>
        </View>

        {/* Mô tả */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translation.description}</Text>
          <Text style={styles.description}>{serviceDetail.description}</Text>
        </View>

        {/* Giá dịch vụ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translation.servicePrice}</Text>
          {serviceDetail.typeOfMonth && (
            <Text style={styles.price}>
              {formatVND(serviceDetail.priceOfMonth)} / {translation.month}
            </Text>
          )}
          {serviceDetail.typeOfYear && (
            <Text style={styles.price}>
              {formatVND(serviceDetail.priceOfYear)} / {translation.year}
            </Text>
          )}
        </View>

        {/* Nút đăng ký */}
        {serviceDetail.status === "active" && (
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>{translation.regis}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#4CAF50",
  },
  inactiveBadge: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "500",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
