import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Thêm interface này sau phần imports
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rate: 4.5;
  brand: string;
}

const Product: Product = {
  id: 1,
  name: "Pate mèo kucinta gói 80g",
  image:
    "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
  price: 10,
  rate: 4.5,
  brand: "Kucinta",
  description:
    "Pate Cho Mèo Kucinta Gói 80g Cao Cấp Nhập Khẩu Từ Malaysia. Quy cách đóng gói: Gói seal 80g.Thành phần: Thịt gà, Cá ngừ, Cá cơm, Cá mòi, Thanh cua. Sản phẩm cao cấp siêu thơm ngon",
};

const ProductDetail = () => {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>

      <View>
        <Image
          source={{ uri: Product.image }}
          resizeMode="cover"
          style={styles.serviceerviceImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {Product.name}
          </Text>
          <View style={styles.priceRateContainer}>
            <Text style={styles.price}>{Product.price}.000 VNĐ</Text>
            {/* <View style={styles.rateContainer}>
              <AntDesign name="star" size={20} color="#FFD700" />
              <Text style={styles.rate}>{Product.rate}</Text>
            </View> */}
          </View>
        </View>
        <View style={{ backgroundColor: "#e9f1ff", height: "1%" }}></View>

        <View style={styles.descriptionContainer}>
          <View>
            <Text style={styles.descriptionTitle}>Chi tiết sản phẩm:</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                Thương hiệu:{" "}
                <Text style={styles.detailContent}>{Product.brand}</Text>
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mô tả:</Text>
              <Text style={styles.detailContent}>{Product.description}</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#e9f1ff", height: "1%" }}></View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingTitle}>Đánh giá của sản phẩm</Text>
            <View style={styles.ratingValue}>
              <Text style={styles.ratingNumber}>{Product.rate}/5</Text>
              <FontAwesome
                name="star"
                size={18}
                color="#ed7c44"
                style={styles.starIcon}
              />
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 10,
    fontWeight: "500",
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
  serviceerviceImage: {
    width: "100%",
    height: 320,
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  brand: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    lineHeight: 24,
  },
  priceRateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    color: "#ed7c44",
    fontWeight: "600",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rate: {
    marginLeft: 5,
    fontSize: 16,
    color: "#666",
  },
  descriptionContainer: {
    backgroundColor: "white",
  },
  descriptionTitle: {
    padding: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },

  separator: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: "#444",
    fontWeight: "500",
  },
  detailContent: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    fontWeight: "400",
  },
  rateText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  ratingContainer: {
    backgroundColor: "white",
    paddingVertical: 5,
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow cho Android (elevation đã có)
    elevation: 5,
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ratingTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  ratingValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 15,
    fontWeight: "500",
    marginRight: 5,
  },
  starIcon: {
    marginLeft: 2,
  },
});
