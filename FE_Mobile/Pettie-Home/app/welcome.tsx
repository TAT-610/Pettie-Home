import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity,} from "react-native";
import { ScrollView } from "react-native";
// import logo from "../assets/images/logo12.png";
const Logo = require('../assets/images/logo12.png')
const PetImage = require('../assets/images/welcome.jpg')

// import pet from "../assets/images/welcome.jpg";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.centerContent}>
        <View style={styles.centerContent1}>
          <Image source={PetImage} style={styles.pet} />
        </View>
        <Image source={Logo} style={styles.logo} />

        <Text style={styles.text}>
          Nơi cung cấp các dịch vụ cho thú cưng tại nhà
        </Text>
      </View>
      <View style={styles.contentbutton}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => router.push("/signup")}
          onPress={() => router.push("/Auths/login")}
          // onPress={() => router.push("/(tabsShop)/homeShop")}
        >
          <Text style={styles.textbutton}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Auths/signup")}
      >
        <Text style={styles.textbutton}>Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#699BF4",
    flex: 1,
  },
  centerContent1: {
    margin: 0,
    paddingTop: 40,
    backgroundColor: "#fff",
    height: 300,
    width: "100%",
  },
  centerContent: {
    flex: 1,
    alignItems: "center", // Căn giữa theo chiều ngang
    justifyContent: "center", // Căn giữa theo chiều dọc
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
  textbutton: {
    fontFamily: "sans-serif",

    fontSize: 16,
    color: "#ffff",
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  contentbutton: {
    marginTop: 50,
    marginBottom: 15,
  },
});
