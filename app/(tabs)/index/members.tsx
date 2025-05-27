import { userDefaultImage } from "@/constants/ImageLink";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const MemberListScreen = () => {
  const navigation = useNavigation<any>();
  const defaultAvatar = userDefaultImage;
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setMembers([
        { id: "1", name: "Nguyen Van A", gender: "male", isHouseOwner: true },
        { id: "2", name: "Tran Thi B", gender: "female", isHouseOwner: false },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={defaultAvatar} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.memberName}>
          {item.name} {item.isHouseOwner ? "(Chủ hộ)" : ""}
        </Text>
        <Text style={styles.gender}>
          {item.gender === "male" ? "Nam" : "Nữ"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <View style={styles.card}>
              <View style={styles.skeletonAvatar} />
              <View style={styles.skeletonText} />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("add_member")}
      >
        <Text style={styles.buttonText}>Thêm thành viên</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "500",
  },
  gender: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  skeletonText: {
    width: "60%",
    height: 16,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default MemberListScreen;
