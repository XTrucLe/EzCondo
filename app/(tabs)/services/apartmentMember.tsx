import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MemberType } from "@/utils/type/memberType";
import { ApartmentMembers } from "@/services/servicesService";
import ModalCustome from "@/components/ui/custome/ModalCustome";

interface UserCardProps {
  user: MemberType;
}

export default function ApartmentMember() {
  const [visible, setVisible] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<MemberType>();
  const members: MemberType[] = ApartmentMembers;
  const UserCard = ({ user }: UserCardProps) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setVisible(true);
        setSelectedUser(user);
      }}
    >
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.dob}>🎂 Ngày sinh: {user.dateOfBirth}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {members.map((member) => (
        <UserCard key={member.id} user={member} />
      ))}
      <ModalCustome
        visible={visible}
        setVisible={setVisible}
        data={selectedUser}
      ></ModalCustome>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Đổ bóng cho Android
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dob: {
    fontSize: 14,
    color: "#666",
  },
});
