import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { enImg, viImg } from "@/constants/ImageLink";

export const ChangeLanguage = ({
  changeLanguage,
  currentLang,
}: {
  changeLanguage: (lang: string) => void;
  currentLang: string;
}) => {
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => changeLanguage(currentLang === "en" ? "vi" : "en")}
    >
      <Image
        source={currentLang === "vi" ? viImg : enImg}
        style={styles.languageImgs}
      />
      <Text>{currentLang}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  languageImgs: { width: 30, height: 30, marginRight: 10 },
});
