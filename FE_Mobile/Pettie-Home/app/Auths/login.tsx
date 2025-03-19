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
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/user/auth";
// import login from "../assets/images/login.png";
const LoginImage = require('../../assets/images/login.png')

const { width, height } = Dimensions.get("window");

// Hàm kiểm tra thiết bị
const isTablet = width >= 600; // Máy tính bảng thường có chiều rộng từ 600px trở lên

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      const { fullName, roles, id } = user.userData.data;
      const userRole = roles.length > 0 ? roles[0] : "USER";

      Alert.alert("Đăng nhập thành công", `Chào mừng ${fullName}`);

      if (userRole === "USER") {
        router.push(`/(tabs)/home?id=${id}`);
      } else if (userRole === "SHOP") {
        router.push(`/(tabsShop)/homeShop?id=${id}`);
      } else {
        router.push("/home");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Lỗi", "Tên đăng nhập hoặc mật khẩu không đúng");
      } else {
        Alert.alert("Lỗi", error.message || "Đăng nhập thất bại");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden={true} />

      {/* Logo chiếm toàn bộ chiều rộng và phần trên của màn hình */}
      <Image source={LoginImage} style={styles.logo} />

      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email hoặc số điện thoại"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View>
        <Text style={styles.forgotPassword}>Bạn quên mật khẩu?</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Không có tài khoản?{" "}
        <Text style={styles.registerLink} onPress={() => router.push("/Auths/signup")}>
          Đăng ký
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: isTablet ? height * 0.1 : height * 0.05,
  },
  logo: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    height: height * 0.8, // Chiếm 30% chiều cao màn hình
    resizeMode: "cover", // Đảm bảo logo phủ toàn bộ khu vực
    alignSelf: "center",
  },
  title: {
    fontSize: isTablet ? width * 0.06 : width * 0.08, // Điều chỉnh font size
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
  forgotPassword: {
    textAlign: "right",
    color: "#333",
    marginBottom: isTablet ? height * 0.03 : height * 0.02,
    marginRight: width * 0.08,
    fontSize: isTablet ? width * 0.035 : width * 0.04,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#ed7c44",
    paddingVertical: isTablet ? height * 0.02 : height * 0.015,
    borderRadius: 8,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: isTablet ? width * 0.045 : width * 0.05,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: isTablet ? height * 0.03 : height * 0.02,
    fontSize: isTablet ? width * 0.035 : width * 0.04,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#000",
  },
});