
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
import { resendOtp, signUpShop, signUpUser } from "@/services/user/auth";
import { ResendOtpType } from "@/services/types";


export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"user" | "shop">("user"); // State lưu vai trò
  const [bankName, setBankName] = useState(""); // Tên ngân hàng
  const [bankAccountNumber, setBankAccountNumber] = useState(""); // Số tài khoản ngân hàng
  const [bankAccountName, setBankAccountName] = useState("");

  const handleSignUpUser = async () => {
    try {
      if (!email || !password || !confirmPassword || !fullName || !phoneNumber) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
        return;
      }

      let requestData;

      if (role === "user") {
        requestData = {
          fullName,
          email,
          phoneNumber,
          password,
        };
        const response = await signUpUser(requestData);

        if ("error" in response && response.error === "EmailNotVerified") {
          console.log("Gửi lại OTP do email chưa xác thực...");
          await resendOtp({ email, type: ResendOtpType.ConfirmEmail });
          Alert.alert("Mã OTP đã được gửi lại", "Vui lòng kiểm tra email của bạn.");
          router.push(`/Auths/confirm?email=${encodeURIComponent(email)}`);
          return;
        }
      } else {
        if (!shopName || !address || !bankName || !bankAccountNumber || !bankAccountName) {
          Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin cửa hàng.");
          return;
        }

        requestData = {
          email,
          password,
          shopName,
          phone: phoneNumber,
          address,
          bankAccountNumber,
          bankName,
          bankAccountName,
        };

        const response = await signUpShop(requestData);

        if ("error" in response && response.error === "EmailNotVerified") {
          console.log("Gửi lại OTP cho Shop...");
          await resendOtp({ email, type: ResendOtpType.ConfirmEmail });
          Alert.alert("Mã OTP đã được gửi lại", "Vui lòng kiểm tra email của bạn.");
          router.push(`/Auths/confirm?email=${encodeURIComponent(email)}`);
          return;
        }
      }

      Alert.alert("Tiếp theo", "Tiếp tục xác thực OTP");
      router.push(`/Auths/confirm?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error("Error signing up:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
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
              placeholder="Tên cửa hàng"
              value={shopName}
              onChangeText={setShopName}
            />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ cửa hàng"
              value={address}
              onChangeText={setAddress}
            />
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
              value={bankAccountNumber}
              onChangeText={setBankAccountNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Tên chủ tài khoản"
              value={bankAccountName}
              onChangeText={setBankAccountName}
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

      <TouchableOpacity style={styles.registerButton} onPress={handleSignUpUser}>
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