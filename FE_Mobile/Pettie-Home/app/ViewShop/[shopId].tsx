import React, { useState, useEffect } from "react";
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
import { getShopDetails } from "../../services/shop/apiShop";
import { Shop } from "../../services/types";
import { getCart } from "../../services/user/cart";

const CartSummary = ({
  shopId,
  onOrderPress,
}: {
  shopId: string;
  onOrderPress: () => void;
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCart(shopId);
      if (data) {
        setCartItems(data);
        calculateSummary(data);
      }
    };

    fetchCartItems();
  }, [shopId]);

  const calculateSummary = (items: any[]) => {
    let quantity = 0;
    let price = 0;

    items.forEach((item) => {
      quantity += item.quantity;
      price +=
        item.quantity *
        (item.product?.price || item.shopService?.price * 1000 || 0);
    });

    setTotalQuantity(quantity);
    setTotalPrice(price);
  };

  return (
    <View style={styles.card}>
      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#ed7c44",
          }}
        >
          Tổng thanh toán ({cartItems.length})
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#ed7c44",
            textAlign: "right",
          }}
        >
          {totalPrice} VNĐ
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
        <TouchableOpacity onPress={onOrderPress}>
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
  );
};

export default function ShopDetail() {
  const router = useRouter();
  const { shopId, distance } = useLocalSearchParams();
  const [navBarColor, setNavBarColor] = useState("rgba(0, 0, 0, 0)");
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const shopData = await getShopDetails(shopId as string);
        setShop(shopData);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết cửa hàng:", error);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  const handleOrderPress = () => {
    router.push(`/Order/OrderCustomer?shopId=${shopId}`);
  };
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setNavBarColor(scrollY > 200 ? "white" : "rgba(0, 0, 0, 0)");
  };

  const initialLayout = { width: Dimensions.get("window").width };

  const data = [
    { id: "1", component: <AllService shopId={shopId as string} /> },
  ];

  if (!shop) {
    return <Text>Loading...</Text>;
  }

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
                uri: shop.imageUrl
                  ? `https://pettiehome.online/web/${shop.imageUrl}`
                  : shop.imageFileName
                  ? `https://pettiehome.online/web/${shop.imageFileName}`
                  : "https://i.pinimg.com/736x/37/e0/b1/37e0b1b41ee635c1af8d1440dafde41c.jpg",
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
                <Text style={styles.shopname}>{shop.name}</Text>
                {/* <Text style={styles.texttitle}>
                  ID shop: <Text style={styles.text}>{shopId}</Text>
                </Text> */}
              </View>
              <Text style={styles.texttitle}>
                Giới thiệu: <Text style={styles.text}>{shop.description}</Text>
              </Text>
              <Text style={styles.texttitle}>
                Thời gian hoạt động:{" "}
                <Text style={styles.text}>8h00 ~ 18h00</Text>
              </Text>
              <View style={styles.contentshop}>
                <Text style={styles.shopDetails}>
                  Đánh giá: <AntDesign name="star" size={15} color="#ecc41c" />
                  <Text style={styles.shopDetails2}> {shop.averageRating}</Text>
                </Text>
                <Text style={styles.shopDetails}>
                  Khoảng cách:{" "}
                  <Octicons name="location" size={14} color="#FE5977" />
                  <Text style={styles.shopDetails2}> {distance}</Text>
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
      <CartSummary
        shopId={Array.isArray(shopId) ? shopId[0] : shopId}
        onOrderPress={handleOrderPress}
      />
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
    marginBottom: 8,
    marginTop: 5, // Khoảng cách bên dưới hàng
  },
  inforshop: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  texttitle: {
    fontWeight: "800",
    color: "#666",
    fontSize: 12.5,
    lineHeight: 17,
    textAlign: "left",
    marginBottom: 5,
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
    paddingBottom: 8,
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
  summaryContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
