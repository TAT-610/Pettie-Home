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
import { useRouter } from "expo-router";
import logo from "../assets/images/logo12.png";
import pet from "../assets/images/bg.jpg";


export default function Welcome() {
  const router = useRouter();

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

      <View style={styles.contentbutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabsShop)/homeShop")}
        ><Text style={styles.textbutton}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      {/* Nút Xem Trước */}
      <TouchableOpacity
        style={styles.button}
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
    alignItems: "center", // Căn giữa theo chiều ngang
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
    width: "78%",
    marginHorizontal: "auto",
    borderRadius: 25, // Bo góc
    paddingVertical: 10, // Thêm khoảng cách trên dưới
    alignItems: "center", // Căn chữ ở giữa
    borderWidth: 1, // Độ dày viền
    borderColor: "#fff", // Màu viền trắng

  },
  previewButton: {
    marginTop: 15,
    backgroundColor: "#4caf50",
  },
  textbutton: {
    fontFamily: "sans-serif",
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 20,
    textAlign: "center",
  },
  contentbutton: {
    marginTop: 50,
    marginBottom: 15,
  },
});
