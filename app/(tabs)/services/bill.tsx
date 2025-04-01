import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import SearchBox from "@/components/ui/SearchBox";
import { applicationImages } from "@/constants/ImageLink";

const ElectricAndWaterBillsScreen = () => {
  const handleSearch = (query: string) => {
    console.log(query);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={applicationImages} />
        <SearchBox onSearch={handleSearch} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
export default ElectricAndWaterBillsScreen;
