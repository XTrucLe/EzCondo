import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { applicationImages } from "@/constants/ImageLink";

const SplashPage = () => {
  return (
    <View style={styles.splash}>
      <Image
        source={applicationImages}
        resizeMode="cover"
        style={styles.splashImage}
      />
      <ActivityIndicator size="large" color="#000000" style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  splashImage: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: [{ translateX: -125 }, { translateY: -125 }],
    width: 250,
    height: 250,
  },
  loading: {
    position: "absolute",
    top: "75%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

export default SplashPage;
