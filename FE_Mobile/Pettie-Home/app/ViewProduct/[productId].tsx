import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { addToCart } from "../../services/user/cart";

const BASE_URL = "http://14.225.198.232:8080/api/v1";

interface Feedback {
  id: number;
  name: String;
  rate: number;
  time: string;
  contentFeedback: string;
  image?: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Nguyễn Văn TúTú",
    rate: 5,
    time: "2024-03-15",
    contentFeedback: "Sản phẩm rất tốt, mèo nhà mình rất thích ăn. Sẽ mua lại!",
    image:
      "https://i.pinimg.com/736x/2b/64/b7/2b64b73f2e3f0a8a0f359f533d50aedf.jpg",
  },
  {
    id: 2,
    name: "Trần Thị Thanh Thủy",
    rate: 4,
    time: "2024-03-14",
    contentFeedback: "Chất lượng ổn, đóng gói cẩn thận. Giá hơi cao.",
  },
  {
    id: 3,
    name: "Lê Văn Đức",
    rate: 5,
    time: "2024-03-13",
    contentFeedback: "Mèo nhà mình rất thích, ăn rất ngon miệng.",
  },
  {
    id: 4,
    name: "Phạm Thị Thái Lài",
    rate: 4,
    time: "2024-03-12",
    contentFeedback:
      "Sản phẩm tốt, giao hàng nhanh. Sẽ ủng hộ shop dài dài. Mà chắc hơi mắc.",
    image:
      "https://i.pinimg.com/736x/67/16/b6/6716b659c39c378f2aef928866585252.jpg",
  },
  {
    id: 5,
    name: "Hoàng Văn Sáng",
    rate: 4,
    time: "2024-03-11",
    contentFeedback: "Chất lượng sản phẩm tốt, đóng gói cẩn thận.",
  },
];

// Tính trung bình rate
const averageRate =
  feedbacks.reduce((sum, feedback) => sum + feedback.rate, 0) /
  feedbacks.length;

// Thêm mảng màu ở đầu file
const avatarColors = [
  "#FF6B6B", // đỏ nhạt
  "#4ECDC4", // xanh ngọc
  "#45B7D1", // xanh dương
  "#96CEB4", // xanh lá nhạt
  "#FFEEBD", // vàng nhạt
  "#D4A5A5", // hồng đất
  "#9FA4C4", // tím nhạt
  "#B5EAD7", // mint
];

// Hàm lấy màu ngẫu nhiên dựa vào id
const getAvatarColor = (id: number) => {
  return avatarColors[id % avatarColors.length];
};

const ProductDetail = () => {
  const { productId, shopId, serviceId } = useLocalSearchParams();
  const router = useRouter();
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [navBarColor, setNavBarColor] = useState("rgba(0, 0, 0, 0)");
  const [product, setProduct] = useState<any | null>(null);
  const [totalPrice, setTotalPrice] = useState(product?.price);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setNavBarColor(scrollY > 320 ? "white" : "rgba(0, 0, 0, 0)");
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (product) {
      setTotalPrice(quantity * product.price);
    }
  }, [quantity, product]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = await getProductDetails(productId as string);
      setProduct(productData);
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
      >
        <View style={{ paddingBottom: 100, backgroundColor: "white" }}>
          <View>
            <Image
              source={{
                uri: product?.imageUrl
                  ? `https://pettiehome.online/web/${product.imageUrl}`
                  : product?.imageFileName
                  ? `https://pettiehome.online/web/${product.imageFileName}`
                  : "default-image-url.jpg",
              }}
              resizeMode="cover"
              style={styles.serviceerviceImage}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                {product?.name || "Tên sản phẩm không có sẵn"}
              </Text>
              <View style={styles.priceRateContainer}>
                <Text style={styles.price}>{product?.price}đ</Text>
              </View>
            </View>
            <View style={{ backgroundColor: "#e9f1ff", height: 10 }}></View>

            <View style={styles.descriptionContainer}>
              <View>
                <Text style={styles.descriptionTitle}>Chi tiết sản phẩm:</Text>
                <View style={styles.separator} />
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Thương hiệu:{" "}
                    <Text style={styles.detailContent}>{product?.brand}</Text>
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Mô tả:</Text>
                  <Text style={styles.detailContent}>
                    {product?.description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#e9f1ff", height: 10 }}></View>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingHeader}>
                <Text style={styles.ratingTitle}>Đánh giá của sản phẩm</Text>
                <View style={styles.ratingValue}>
                  <Text style={styles.ratingNumber}>
                   4/5
                  </Text>
                  <FontAwesome
                    name="star"
                    size={18}
                    color="#ed7c44"
                    style={styles.starIcon}
                  />
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.feedbacksContainer}>
                {feedbacks.map((feedback) => (
                  <View key={feedback.id} style={styles.feedbackItem}>
                    <View style={styles.feedbackHeader}>
                      <View
                        style={[
                          styles.userImage,
                          styles.defaultUserImage,
                          { backgroundColor: getAvatarColor(feedback.id) },
                        ]}
                      >
                        <Text style={[styles.userInitial, { color: "white" }]}>
                          {feedback.name.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{feedback.name}</Text>
                        <View style={styles.timeRateContainer}>
                          {[...Array(5)].map((_, index) => (
                            <FontAwesome
                              key={index}
                              name={index < feedback.rate ? "star" : "star-o"}
                              size={12}
                              color="#ed7c44"
                              style={styles.starSmall}
                            />
                          ))}
                          <Text style={styles.feedbackTime}>
                            {" "}
                            • {feedback.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.feedbackContent}>
                      {feedback.contentFeedback}
                    </Text>
                    {feedback.image && (
                      <Image
                        source={{ uri: feedback.image }}
                        style={styles.feedbackImage}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.navigation, { backgroundColor: navBarColor }]}>
        <AntDesign
          name="arrowleft"
          size={28}
          color={navBarColor === "white" ? "#ed7c44" : "white"}
          onPress={() => router.back()}
          style={[
            styles.backButton,
            {
              backgroundColor:
                navBarColor === "white" ? "#eee" : "rgba(0, 0, 0, 0.5)",
            },
          ]}
        />
        <Feather
          name="more-vertical"
          size={27}
          color={navBarColor === "white" ? "#ed7c44" : "white"}
          style={[
            styles.backButton,
            {
              backgroundColor:
                navBarColor === "white" ? "#eee" : "rgba(0, 0, 0, 0.5)",
            },
          ]}
        />
      </View>
      {/* Thanh thêm vào giỏ hàng */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => setShowQuantityModal(true)}
        >
          <Text style={styles.addToCartText}>
            {`Thêm vào giỏ • ${totalPrice}đ`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal chọn số lượng */}
      <Modal
        visible={showQuantityModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn số lượng</Text>

            <View style={styles.quantitySelector}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <AntDesign name="minussquare" size={30} color="#ed7c44" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity onPress={increaseQuantity}>
                <AntDesign name="plussquare" size={30} color="#ed7c44" />
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>Tổng tiền: {totalPrice} VNĐ</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowQuantityModal(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  console.log(`Thêm ${quantity} sản phẩm vào giỏ`);
                  addToCart(
                    shopId as string,
                    null,
                    productId as string,
                    quantity
                  );
                  setShowQuantityModal(false);
                  router.push(`/ViewShop/${shopId}`);
                }}
              >
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetail;

export const getProductDetails = async (productId: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return null;
  }
};

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
    padding: 5,
    marginRight: 10,
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
  feedbacksContainer: {
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  feedbackItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
  },
  timeRateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  starSmall: {
    marginRight: 2,
  },
  feedbackTime: {
    fontSize: 12,
    color: "#666",
  },
  feedbackContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  defaultUserImage: {
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  feedbackImage: {
    width: "50%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: 115,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: "#ed7c44",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  quantitySelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ed7c44",
  },
  confirmButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ed7c44",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#ed7c44",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ed7c44",
    textAlign: "center",
    marginBottom: 30,
  },
});
