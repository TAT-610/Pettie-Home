import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { resendOtp, signUpShop, signUpUser } from "@/services/user/auth";
import { ResendOtpType } from "@/services/types";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";
import logo from "../../assets/images/login.png";

const { width, height } = Dimensions.get("window");

// Hàm kiểm tra thiết bị
const isTablet = width >= 600; // Máy tính bảng thường có chiều rộng từ 600px trở lên

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"user" | "shop">("user");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const openPrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync("http://14.225.198.232:8080/api/v1/privacy-policy");
    } catch (error) {
      console.error("Error opening privacy policy:", error);
      Alert.alert("Lỗi", "Không thể mở trang điều khoản. Vui lòng thử lại sau.");
    }
  };

  const handleSignUpUser = async () => {
    try {
      if (!email || !password || !confirmPassword || !fullName || !phoneNumber) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          "Lỗi",
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
        );
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Lỗi", "Email không hợp lệ.");
        return;
      }

      const phoneRegex = /^\d{10,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        Alert.alert("Lỗi", "Số điện thoại không hợp lệ.");
        return;
      }

      if (!acceptTerms) {
        Alert.alert("Lỗi", "Vui lòng chấp nhận điều khoản và điều kiện để tiếp tục.");
        return;
      }

      if (role === "shop") {
        if (!shopName || !address || !bankName || !bankAccountNumber || !bankAccountName) {
          Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin cửa hàng.");
          return;
        }
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
          await resendOtp({ email, type: ResendOtpType.ConfirmEmail });
          Alert.alert("Mã OTP đã được gửi lại", "Vui lòng kiểm tra email của bạn.");
          router.push(`/Auths/confirm?email=${encodeURIComponent(email)}`);
          return;
        }
      } else {
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

      {/* Logo chiếm toàn bộ chiều rộng và phần trên của màn hình */}
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

      <View style={styles.roleContainer}>
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

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <Ionicons
            name={acceptTerms ? "checkbox" : "square-outline"}
            size={24}
            color={acceptTerms ? "#ed7c44" : "#666"}
          />
          <Text style={styles.termsText}>
            Tôi đồng ý với{" "}
            <Text style={styles.termsLink} onPress={openPrivacyPolicy}>
              điều khoản và điều kiện
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[
          styles.registerButton, 
          !acceptTerms && styles.disabledButton
        ]} 
        onPress={handleSignUpUser}
        disabled={!acceptTerms}
      >
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
    paddingVertical: isTablet ? height * 0.05 : height * 0.02,
  },
  logo: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    height: height * 0.6, // Chiếm 30% chiều cao màn hình
    resizeMode: "cover", // Đảm bảo logo phủ toàn bộ khu vực
    alignSelf: "center",
  },
  title: {
    fontSize: isTablet ? width * 0.06 : width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: isTablet ? height * 0.03 : height * 0.02,
  },
  inputContainer: {
    width: "100%",
    marginBottom: isTablet ? height * 0.03 : height * 0.02,
    alignItems: "center",
  },
  input: {
    height: isTablet ? height * 0.07 : height * 0.06,
    width: "85%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: isTablet ? height * 0.02 : height * 0.015,
    fontSize: isTablet ? width * 0.04 : width * 0.045,
  },
  roleContainer: {
    marginBottom: isTablet ? height * 0.03 : height * 0.02,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioText: { fontSize: isTablet ? width * 0.04 : width * 0.045, marginLeft: 10 },
  termsContainer: {
    width: "85%",
    alignSelf: "center",
    marginBottom: isTablet ? height * 0.03 : height * 0.02,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  termsText: {
    marginLeft: 10,
    fontSize: isTablet ? width * 0.035 : width * 0.04,
    flexShrink: 1,
  },
  termsLink: {
    color: "#ed7c44",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#ed7c44",
    paddingVertical: isTablet ? height * 0.02 : height * 0.015,
    borderRadius: 8,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    marginBottom: 5,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  registerText: { color: "#fff", fontSize: isTablet ? width * 0.045 : width * 0.05, fontWeight: "bold" },
  loginText: { textAlign: "center", marginTop: isTablet ? height * 0.03 : height * 0.02, fontSize: isTablet ? width * 0.035 : width * 0.04, marginBottom: 20 },
  registerLink: { fontWeight: "bold", color: "#000" },
});