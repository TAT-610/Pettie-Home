import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { confirmEmail } from "@/services/user/auth";

export default function ConfirmOTP() {
  const router = useRouter();
  const requestData = useLocalSearchParams();
  const email = Array.isArray(requestData.email) ? requestData.email[0] : requestData.email;
  console.log("requestData in ConfirmOTPScreen: ", requestData);

  const [otp, setOtp] = useState("");

  const handleConfirmOTP = async () => {
    if (!otp) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP.");
      return;
    }
  
    const otpNumber = parseInt(otp, 10); // Chuyển từ string -> number
  
    if (isNaN(otpNumber)) {
      Alert.alert("Lỗi", "Mã OTP không hợp lệ.");
      return;
    }
  
    try {
      const response = await confirmEmail({ email, otp: otpNumber }); // Gửi dạng number
  
      if (response?.status === 200) {
        Alert.alert("Thành công", "Xác thực email thành công, vui lòng đăng nhập!");
        router.push("/Auths/login"); // Chuyển đến trang đăng nhập
      }
    } catch (error: any) {
      if (error?.response?.data?.detail) {
        Alert.alert("Lỗi", error.response.data.detail);
      } else {
        Alert.alert("Lỗi", "Mã OTP không hợp lệ hoặc đã hết hạn.");
      }
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
