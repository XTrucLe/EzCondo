// Footer.tsx
import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";

const Footer = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#1E293B", // dark-slate
        borderTopWidth: 1,
        borderTopColor: "#334155",
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        EZCondo - Quản lý căn hộ thông minh
      </Text>

      {/* Liên kết nhanh */}
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}
      >
        {[
          { label: "Giới thiệu", url: "https://ezcondo.vn/about" },
          { label: "Điều khoản dịch vụ", url: "https://ezcondo.vn/terms" },
          { label: "Chính sách bảo mật", url: "https://ezcondo.vn/privacy" },
          { label: "Liên hệ", url: "https://ezcondo.vn/contact" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.url)}
            style={{ marginRight: 16, marginBottom: 6 }}
          >
            <Text style={{ color: "#93C5FD", fontSize: 14 }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Thông tin liên hệ */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: "#CBD5E1", fontSize: 14 }}>
          Hỗ trợ kỹ thuật: support@ezcondo.vn
        </Text>
        <Text style={{ color: "#CBD5E1", fontSize: 14 }}>
          Hotline: 1900 123 456
        </Text>
      </View>

      {/* Bản quyền */}
      <Text style={{ color: "#64748B", fontSize: 12, textAlign: "center" }}>
        © 2025 EZCondo. All rights reserved.
      </Text>
    </View>
  );
};

export default Footer;
