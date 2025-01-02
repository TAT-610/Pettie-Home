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
import { useState } from "react";
import { useRouter } from "expo-router";
import logo from "../assets/images/logo12.png";
import pet from "../assets/images/bg.jpg";

const accounts = [
  { username: "user123", password: "123456", type: "user" },
  { username: "shop123", password: "123456", type: "shop" },
];

export default function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const account = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (account) {
      if (account.type === "user") {
        router.push("/(tabs)/home"); // Điều hướng đến trang Home của người dùng
      } else if (account.type === "shop") {
        router.push("/(tabsShop)/homeShop"); // Điều hướng đến trang HomeShop của shop
      }
    } else {
      Alert.alert("Lỗi đăng nhập", "Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.centerContent}>
        <View style={styles.centerContent1}>
          <Image source={pet} style={styles.pet} />
        </View>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.text}>
          Nơi cung cấp các dịch vụ cho thú cưng tại nhà
        </Text>
      </View>

      {/* Form Đăng Nhập */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.textbutton}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Xem Trước */}
      <TouchableOpacity
        style={[styles.button, styles.previewButton]}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.textbutton}>Xem trước</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#01b9bb",
    flex: 1,
  },
  centerContent1: {
    margin: 0,
    paddingTop: 40,
    backgroundColor: "#ffff",
    height: 300,
    width: "100%",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginLeft: 1,
    width: 200,
    height: 120,
  },
  pet: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 1,
    marginHorizontal: 30,
    textAlign: "center",
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#ed7c44",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 40,
  },
  previewButton: {
    marginTop: 15,
    backgroundColor: "#4caf50",
  },
  textbutton: {
    fontFamily: "sans-serif",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
