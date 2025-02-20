import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { registerUser } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import logo from "../../assets/images/login.png";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "shop">("user"); // State lưu vai trò

  const handleRegister = async () => {
    try {
      const user = await registerUser(username, phoneNumber, password, confirmPassword, role);
      Alert.alert("Đăng ký thành công", `Chào mừng ${user.userName}`);
      router.push("/Auths/login");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng ký thất bại");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Đăng ký</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="UserName" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      {/* Chọn vai trò bằng Ionicons */}

      <View style={styles.roleContainer}>

        {/* Người dùng */}
        <TouchableOpacity style={styles.radioOption} onPress={() => setRole("user")}>
          <Ionicons name={role === "user" ? "radio-button-on" : "radio-button-off"} size={24} color="blue" />
          <Text style={styles.radioText}>Người dùng</Text>
        </TouchableOpacity>

        {/* Cửa hàng */}
        <TouchableOpacity style={styles.radioOption} onPress={() => setRole("shop")}>
          <Ionicons name={role === "shop" ? "radio-button-on" : "radio-button-off"} size={24} color="blue" />
          <Text style={styles.radioText}>Cửa hàng</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  logo: { marginLeft: 1, width: "100%", height: 400 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: { width: "100%", marginBottom: 10, alignItems: "center" },
  input: {
    height: 50,
    width: "85%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  roleContainer: { marginBottom: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent:'space-evenly' },
  roleTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioText: { fontSize: 16, marginLeft: 10 },
  registerButton: { backgroundColor: "#ed7c44", paddingVertical: 12, borderRadius: 8, alignItems: "center", width: "85%", alignSelf: "center" },
  registerText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
