import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import ServicesOfOthers from "../../components/DetailShop/Services";
// import ServicesOfCat from "../../components/DetailShop/ServicesOfCat";
// import ServiceOfDog from "../../components/DetailShop/ServiceOfDog";
// import Product from "../../components/DetailShop/Product";
import AllService from "../../components/DetailShop/AllService";

export default function ShopDetail() {
  const router = useRouter();
  const { shopId } = useLocalSearchParams();
  const [navBarColor, setNavBarColor] = useState("rgba(0, 0, 0, 0)");
  const handleOrderPress = () => {
    router.push(`/Order/OrderCustomer`); // Navigate to ProductDetail page
  };
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setNavBarColor(scrollY > 200 ? "white" : "rgba(0, 0, 0, 0)");
  };

  const initialLayout = { width: Dimensions.get("window").width };

  const data = [{ id: "1", component: <AllService /> }];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/7f/78/37/7f783761231551f96aadbaece6e7e1d9.jpg",
              }}
              resizeMode="cover"
              style={styles.shopImage}
            />
            <View style={styles.aboutshop}>
              <View style={styles.row}>
                <Entypo
                  name="shop"
                  size={22}
                  color="#ed7c44"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.shopname}>Tiệm Spa nhà Bụp </Text>
                {/* <Text style={styles.texttitle}>
                  ID shop: <Text style={styles.text}>{shopId}</Text>
                </Text> */}
              </View>
              <Text style={styles.texttitle}>
                Giới thiệu:{" "}
                <Text style={styles.text}>
                  Nhà Bụp với 2 năm kinh nghiệm trong việc spa thú cưng, tụi
                  mình luôn muốn bạn và thú cưng có trãi nghiệm tốt nhất.
                </Text>
              </Text>
              <Text style={styles.texttitle}>
                Thời gian hoạt động:{" "}
                <Text style={styles.text}>8h00 ~ 18h00</Text>
              </Text>
              <View style={styles.contentshop}>
                <Text style={styles.shopDetails}>
                  Đánh giá: <AntDesign name="star" size={15} color="#ecc41c" />
                  <Text style={styles.shopDetails2}> 4.5</Text>
                </Text>
                <Text style={styles.shopDetails}>
                  Khoảng cách:{" "}
                  <Octicons name="location" size={14} color="#FE5977" />
                  <Text style={styles.shopDetails2}> 5km</Text>
                </Text>
              </View>
            </View>
          </>
        }
      />
      <View style={[styles.navigation, { backgroundColor: navBarColor }]}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.push("/(tabs)/home")}
          style={styles.backButton}
        />

        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>
      <View style={styles.card}>
        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#ed7c44",
            }}
          >
            Tổng thanh toán(3)
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ed7c44",

              textAlign: "right",
            }}
          >
            340.000đ
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ed7c44",
            paddingVertical: 15,
            paddingHorizontal: 25,
            marginLeft: 15,
          }}
        >
          <TouchableOpacity onPress={handleOrderPress}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "white",
              }}
            >
              Đặt dịch vụ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1ff",
  },

  card: {
    justifyContent: "flex-end",
    height: 100,
    flexDirection: "row", // Align items in a row

    position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it is above other content
    elevation: 10, // Hiệu ứng bóng trên Android
    shadowColor: "black", // Màu bóng
    shadowOffset: { width: 0, height: -5 }, // Điều chỉnh hướng bóng (hướng lên trên)
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 5, // Bán kính làm mờ bóng
    backgroundColor: "white",
  },
  navigation: {
    justifyContent: "space-between",
    height: 80, // Fixed height for the navigation bar
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    paddingHorizontal: 10, // Horizontal padding
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it is above other content

    backgroundColor: "none",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    marginRight: 10, // Space between button and title
    borderRadius: 100,
  },
  navigationTitle: {
    color: "black", // Change to black for better visibility
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 20, // Optional: Add some padding at the bottom
  },
  shopImage: {
    width: "100%",
    height: 180,
  },
  aboutshop: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  shopname: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  row: {
    flexDirection: "row", // Đặt icon và tên shop trên cùng một dòng
    alignItems: "center", // Căn giữa icon và tên theo chiều dọc
    justifyContent: "center", // Căn chúng bắt đầu từ bên trái
    marginBottom: 8, // Khoảng cách bên dưới hàng
  },
  inforshop: {
    alignItems: "flex-start",
    marginBottom: 5,
  },
  texttitle: {
    fontWeight: "800",
    color: "#666",
    fontSize: 12.5,
    lineHeight: 16,
    textAlign: "left",
  },
  text: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12.5,
  },
  contentshop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopDetails: {
    fontWeight: "800",
    color: "#666",
    fontSize: 12.5,
  },
  shopDetails2: {
    fontSize: 12.5,
    color: "#666",
    paddingRight: 20,
    fontWeight: "400",
  },
  detailItem2: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
});
