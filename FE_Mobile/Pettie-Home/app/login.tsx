import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, TextInput,} from "react-native";
import { ScrollView } from "react-native";
import logo from "../assets/images/login.png";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <Image source={logo} style={styles.logo} />

      {/* Tiêu đề */}
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Ô nhập số điện thoại và mật khẩu */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Số điện thoại" />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
        />
      </View>

      {/* Quên mật khẩu */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Bạn quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Chưa có tài khoản? Đăng ký */}
      <Text style={styles.registerText}>
        Không có tài khoản?{" "}
        <Text style={styles.registerLink} onPress={() => router.push("/signup")}>
          Đăng ký
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
  logo: {
    marginLeft: 1,
    width: 410,
    height: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center", // Căn giữa ô nhập liệu
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
    alignContent: "center",
    fontWeight: "600",
    fontSize: 16
  },
  forgotPassword: {
    textAlign: "right",
    color: "#333",
    marginBottom: 20,
    marginRight: 34,
    fontSize: 15,
    fontWeight: "500"
  },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "85%",
    alignSelf: "center"
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#000",
  },
});
