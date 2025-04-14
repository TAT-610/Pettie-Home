import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, Text, View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView, ScrollView } from "react-native";

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

  const { width, height } = Dimensions.get('window');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { padding: width * 0.05 }]}>
          <Text style={[styles.title, { fontSize: width * 0.06 }]}>Xác nhận OTP</Text>
          <TextInput
            style={[styles.input, { height: height * 0.07, width: width * 0.9 }]}
            placeholder="Nhập OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={[styles.button, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.1 }]} onPress={handleConfirmOTP}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9f1ff"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#ed7c44",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});