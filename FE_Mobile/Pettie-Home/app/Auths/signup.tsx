import { registerUser } from "@/services/user/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../../assets/images/login.png";
import { emailOtpGeneration } from "@/services/user/auth";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "shop">("user"); // State lưu vai trò
  const [bankName, setBankName] = useState(""); // Tên ngân hàng
  const [bankAccount, setBankAccount] = useState(""); // Số tài khoản ngân hàng

  const handleRegister = async () => {
    try {
      // Gửi yêu cầu OTP với isSignUp: true
      await emailOtpGeneration({ email, isSignUp: true });
  
      // Chuyển hướng đến trang xác nhận OTP và truyền thông tin qua params
      router.push({
        pathname: "/Auths/confirm",
        params: {
          fullName,
          email,
          phoneNumber,
          password,
          confirmPassword,
          role,
          bankName: role === "shop" ? bankName : undefined,
          bankAccount: role === "shop" ? bankAccount : undefined,
        },
      });
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Gửi OTP thất bại");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <StatusBar hidden={true} />

      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Đăng ký</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Nếu chọn role "shop", hiển thị thêm input */}
        {role === "shop" && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Tên ngân hàng"
              value={bankName}
              onChangeText={setBankName}
            />
            <TextInput
              style={styles.input}
              placeholder="Số tài khoản ngân hàng"
              keyboardType="numeric"
              value={bankAccount}
              onChangeText={setBankAccount}
            />
          </>
        )}
      </View>

      {/* Chọn vai trò bằng Ionicons */}
      <View style={styles.roleContainer}>
        {/* Người dùng */}
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setRole("user")}
        >
          <Ionicons
            name={role === "user" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="blue"
          />
          <Text style={styles.radioText}>Người dùng</Text>
        </TouchableOpacity>

        {/* Cửa hàng */}
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setRole("shop")}
        >
          <Ionicons
            name={role === "shop" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="blue"
          />
          <Text style={styles.radioText}>Cửa hàng</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Đăng ký</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Đã có tài khoản!{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/Auths/login")}
        >
          Đăng nhập
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  logo: { marginLeft: 1, width: "100%", height: 350 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
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
  roleContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioText: { fontSize: 16, marginLeft: 10 },
  registerButton: {
    backgroundColor: "#ed7c44",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    marginBottom: 5,
  },
  registerText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loginText: { textAlign: "center", marginTop: 20, fontSize: 14 },
  registerLink: { fontWeight: "bold", color: "#000" },
});