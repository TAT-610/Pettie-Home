import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
export default function ShopDetail() {
  const router = useRouter();
  const { shopId } = useLocalSearchParams();

  // State to track the background color of the navigation bar
  const [navBarColor, setNavBarColor] = useState("rgba(0, 0, 0, 0)");

  // Function to handle scroll events
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Change the color based on scroll position
    if (scrollY > 200) {
      setNavBarColor("white"); // Change to white when scrolled down
    } else {
      setNavBarColor("rgba(0, 0, 0, 0)"); // Original color
    }
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll} // Attach the scroll handler
        scrollEventThrottle={16} // Control the frequency of scroll events
      >
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
              style={{
                marginRight: 5,
              }}
            />
            <Text style={styles.shopname}>Tiệm Spa nhà Bụp</Text>
          </View>
          <View style={styles.inforshop}>
            <Text style={styles.texttitle}>
              Giới thiệu:{" "}
              <Text style={styles.text}>
                Nhà Bụp với 2 năm kinh nghiệm trong việc spa thú cưng, tụi mình
                tin chắc là sẽ đem lại những dịch vụ giúp thú cưng và bạn hài
                lòng.
              </Text>
            </Text>
          </View>
          <View style={styles.inforshop}>
            <Text style={styles.texttitle}>
              Thời gian hoạt động: <Text style={styles.text}>8h00 ~ 18h00</Text>
            </Text>
          </View>
          <View style={styles.contentshop}>
            <View style={styles.detailItem}>
              <Text style={styles.shopDetails}>
                Đánh giá: <AntDesign name="star" size={15} color="#ecc41c" />
                <Text style={styles.shopDetails2}> 4.5</Text>
              </Text>
            </View>
            <View style={styles.detailItem2}>
              <Text style={styles.shopDetails}>
                Khoảng cách:{" "}
                <Octicons name="location" size={14} color="#FE5977" />
                <Text style={styles.shopDetails2}> 5km</Text>
              </Text>
            </View>
          </View>
        </View>
        <View></View>

        <Text>Product ID: {shopId}</Text>
      </ScrollView>

      {/* Fixed Navigation Bar */}
      <View style={[styles.navigation, { backgroundColor: navBarColor }]}>
        <AntDesign
          name="arrowleft"
          size={32}
          color="white"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Feather
          name="more-vertical"
          size={32}
          color="white"
          style={styles.backButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1ff",
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
    height: 200,
  },
  aboutshop: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  shopname: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  row: {
    flexDirection: "row", // Đặt icon và tên shop trên cùng một dòng
    alignItems: "center", // Căn giữa icon và tên theo chiều dọc
    justifyContent: "center", // Căn chúng bắt đầu từ bên trái
    marginBottom: 12, // Khoảng cách bên dưới hàng
  },
  inforshop: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  texttitle: {
    fontWeight: "800",
    color: "#666",
    fontSize: 14.5,
    lineHeight: 18,
    textAlign: "left",
  },
  text: {
    fontWeight: "400",
    color: "#666",
    fontSize: 14.5,
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
    fontSize: 14.5,
  },
  shopDetails2: {
    fontSize: 14,
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
