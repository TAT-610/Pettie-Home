import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const orderSummary = [
  {
    serviceId: 1,
    quantity: 1,
    price: 100,
    image:
      "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
  },
  {
    productId: 1,
    quantity: 2,
    price: 10,
    image:
      "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg",
  },
];

const DogService1 = {
  id: 1,
  name: "Tắm cơ bản cho chó < 4kg",
  image:
    "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
  price: 100,
  shopId: 2,
  description:
    "Dịch vụ tắm cơ bản dành cho chó dưới 4 kg bao gồm tỉa lông cơ bản, vệ sinh lỗ tai, cắt móng/ dũa móng, tắm bằng xà boong chuyên dụng, sấy lông, gỡ rối, đánh tơi và thoa lotion nước hoa cho chó.",
};

const Product = {
  id: 1,
  name: "Pate mèo kucinta gói 80g",
  image:
    "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
  price: 10,
  rate: 4.5, // Giả sử đây là đánh giá trung bình
  brand: "Kucinta",
  description:
    "Pate Cho Mèo Kucinta Gói 80g Cao Cấp Nhập Khẩu Từ Malaysia. Quy cách đóng gói: Gói seal 80g. Thành phần: Thịt gà, Cá ngừ, Cá cơm, Cá mòi, Thanh cua. Sản phẩm cao cấp siêu thơm ngon",
  shopId: 2,
};

const OrderCustomer = () => {
  const router = useRouter();
  const { address } = useLocalSearchParams();
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");

  const defaultAddress =
    "Tòa Bs16, 88 Phước Thiện, Khu phố 29, Quận 9, Hồ Chí Minh";

  const handleChooseAddress = () => {
    router.push(`/Order/Address`);
  };

  const handlePlaceOrder = () => {
    console.log("Đặt hàng thành công với phương thức: ", paymentMethod);
  };

  // Tính tổng tiền đơn hàng
  const calculateTotal = () => {
    return orderSummary.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.push("/ViewShop/2")}
          style={styles.backButton}
        />
        <Text style={styles.textpay}>Thanh toán</Text>
        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Địa chỉ nhận hàng */}
        <Text style={styles.sectionTitle}>
          <FontAwesome6 name="location-dot" size={16} color="#ed7c44" /> Địa chỉ
          nhận hàng:
        </Text>
        <TouchableOpacity
        // onPress={handleChooseAddress}
        // style={styles.addressContainer}
        >
          <Text style={styles.addressText}>{address || defaultAddress}</Text>
        </TouchableOpacity>

        {/* Số điện thoại */}
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="phone-alt" size={16} color="#ed7c44" /> Số điện
          thoại:
        </Text>
        <Text style={styles.addressText}>0886133779</Text>

        <Text style={styles.sectionTitle}>🛒 Tóm tắt đơn hàng:</Text>
        {orderSummary.map((item, index) => {
          const isService = item.serviceId !== undefined;
          const service = isService ? DogService1 : Product;
          return (
            <View key={index} style={styles.orderSummaryItem}>
              <Image source={{ uri: item.image }} style={styles.orderImage} />
              <Text style={styles.orderSummaryText}>
                {service.name} - {item.price}đ x {item.quantity}
              </Text>
            </View>
          );
        })}

        <Text style={styles.totalText}>Tổng: {calculateTotal()}đ</Text>

        <Text style={styles.sectionTitle}>💬 Lưu ý cho shop:</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Nhập lời nhắn..."
          style={styles.noteInput}
        />

        <Text style={styles.sectionTitle}>💳 Phương thức thanh toán:</Text>
        <TouchableOpacity
          onPress={() => setPaymentMethod("VN Pay")}
          style={[
            styles.paymentButton,
            paymentMethod === "VN Pay" && styles.selectedPaymentButton,
          ]}
        >
          <Text>Thanh toán VN Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPaymentMethod("Tiền mặt")}
          style={[
            styles.paymentButton,
            paymentMethod === "Tiền mặt" && styles.selectedPaymentButton,
          ]}
        >
          <Text>Tiền mặt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
        >
          <Text style={styles.placeOrderText}>Đặt hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  navigation: {
    justifyContent: "space-between",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 100,
  },
  scrollView: {
    paddingTop: 80,
  },
  chooseAddressButton: {
    marginBottom: 20,
  },
  chooseAddressText: {
    fontSize: 16,
    color: "blue",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
    marginBottom: 5,
  },
  orderSummaryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  orderSummaryText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 10,
  },
  paymentButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
  },
  selectedPaymentButton: {
    backgroundColor: "lightblue",
  },
  placeOrderButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ed7c44",
  },
  placeOrderText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  textpay: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    paddingTop: 20,
  },
});

export default OrderCustomer;
