import { useLanguage } from "@/hooks/useLanguage";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SearchBox = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const { translation } = useLanguage();

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={translation.searchPlaceholder}
        value={query}
        onChangeText={handleSearch}
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => handleSearch("")}>
          <Ionicons
            name="close-circle"
            size={20}
            color="#888"
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 50,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearIcon: {
    marginLeft: 5,
  },
});

export default SearchBox;
