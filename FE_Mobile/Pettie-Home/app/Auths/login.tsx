import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { ScrollView } from "react-native";
import logo from "../../assets/images/login.png";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/api";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);

      if (!user || !user.role || !user.id) {
        throw new Error("Không thể xác định vai trò người dùng.");
      }

      Alert.alert("Đăng nhập thành công", `Chào mừng ${user.userName}`);

      // Điều hướng dựa theo role
      if (user.role === "user") {
        router.push(`/(tabs)/home?id=${user.id}`);
      } else if (user.role === "shop") {
        router.push(`/(tabsShop)/homeShop?id=${user.id}`);
        console.log(`Truyen ID User AfterLogin",${user.id}`);
      } else {
        router.push("/home");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng nhập thất bại");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="UserName"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Bạn quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Không có tài khoản?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/Auths/signup")}
        >
          Đăng ký
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  logo: { marginLeft: 1, width: 410, height: 400 },
  title: {
    fontSize: 24,
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
  forgotPassword: {
    textAlign: "right",
    color: "#333",
    marginBottom: 20,
    marginRight: 34,
    fontSize: 15,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#ed7c44",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  registerText: { textAlign: "center", marginTop: 20, fontSize: 14 },
  registerLink: { fontWeight: "bold", color: "#000" },
});
