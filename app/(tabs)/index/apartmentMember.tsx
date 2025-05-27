import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalCustome from "@/components/ui/custome/ModalCustome";
import { UserWithMembers, Member } from "@/utils/type/HouseMember";
import { userDefaultImage } from "@/constants/ImageLink";
import { getMembers } from "@/services/memberService";
import { useLanguage } from "@/hooks/useLanguage";
import useAuthStore from "@/hooks/useAuth";

interface UserCardProps {
  user: Member;
  isHouseholder?: boolean;
  onPress: () => void;
  translation?: any;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress, translation }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={userDefaultImage} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.dob}>
        🎂 {translation.dateOfBirth}: {user.dateOfBirth}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ApartmentMember() {
  const { user } = useAuthStore();
  const { translation } = useLanguage();
  const [visible, setVisible] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<Member>();
  const [data, setData] = useState<UserWithMembers>({
    user: {
      id: "",
      regency: "",
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "Male",
      phoneNumber: "",
      avatar: "",
    },
    members: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Giả lập dữ liệu từ API
      const response = await getMembers(); // Thay bằng API thực tế
      setData(response); // Giả lập dữ liệu thành công
    };
    fetchData();
  }, []);

  const renderHouseholder = () => {
    if (data.user) {
      return (
        <TouchableOpacity
          style={[
            styles.card,
            { marginBottom: 20, backgroundColor: "#f9f9f9" },
          ]}
          onPress={() => {
            setSelectedUser(data.user as unknown as Member);
            setVisible(true);
          }}
        >
          <Image
            source={user?.avatar ? { uri: user?.avatar } : userDefaultImage}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{data.user.fullName}</Text>
            <Text style={styles.dob}>
              🎂 {translation.dateOfBirth}: {data.user.dateOfBirth}
            </Text>
            <Text style={styles.dob}>
              {translation.phoneNumber}: {data.user.phoneNumber}
            </Text>
            <Text style={styles.dob}>Vai trò: Chủ Hộ</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHouseholder()}
      {data.members.map((member) => (
        <UserCard
          key={member.id}
          user={member}
          onPress={() => {
            setSelectedUser(member);
            setVisible(true);
          }}
          translation={translation}
        />
      ))}

      <ModalCustome
        visible={visible}
        setVisible={setVisible}
        data={selectedUser}
      />
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
    margin: 4,
  },
});
