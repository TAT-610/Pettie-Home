import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { registerUser } from "@/services/user/auth";
import { verifyEmailOtp } from "@/services/user/auth";

export default function ConfirmOTP() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleConfirmOTP = async () => {
    try {
      // Xác minh OTP
      await verifyEmailOtp({
        email: Array.isArray(params.email) ? params.email[0] : params.email, // Lấy phần tử đầu tiên nếu là mảng
        otp, // Mã OTP từ người dùng
        isSignUp: true, // Đây là yêu cầu đăng ký
      });
  
      // Nếu OTP hợp lệ, tiến hành đăng ký tài khoản
      const user = await registerUser(
        params.fullName as string,
        params.email as string,
        params.phoneNumber as string,
        params.password as string,
        params.confirmPassword as string,
        params.role as "user" | "shop",
        params.role === "shop" ? (params.bankName as string) : undefined,
        params.role === "shop" ? (params.bankAccount as string) : undefined
      );
  
      // Chuyển hướng đến trang đăng nhập hoặc trang chính
      router.push("/Auths/login");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Xác nhận OTP thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ed7c44",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});