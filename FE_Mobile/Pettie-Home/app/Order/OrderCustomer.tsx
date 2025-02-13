import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const OrderCustomer = () => {
  const router = useRouter();
  const { address } = useLocalSearchParams();
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");

  const handleChooseAddress = () => {
    router.push(`/Order/Address`);
  };

  const handlePlaceOrder = () => {
    console.log("Đặt hàng thành công với phương thức ok: ", paymentMethod);
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
        <TouchableOpacity
          onPress={handleChooseAddress}
          style={styles.chooseAddressButton}
        >
          <Text style={styles.chooseAddressText}>Chọn lại địa chỉ</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>📍 Địa chỉ bạn chọn là:</Text>
        <Text style={styles.addressText}>{address || "Chưa có địa chỉ"}</Text>

        <Text style={styles.sectionTitle}>🛒 Tóm tắt đơn hàng:</Text>
        <Text style={styles.orderSummaryText}>
          Cắt tỉa lông (Chó/Mèo) - 150.000đ
        </Text>
        <Text style={styles.orderSummaryText}>
          Tạo hình đặc biệt - 200.000đ x2
        </Text>
        <Text style={styles.orderSummaryText}>
          Tạo hình đặc biệt - 120.000đ x2
        </Text>
        <Text style={styles.totalText}>Tổng: 910.000đ</Text>

        <Text style={styles.sectionTitle}>💬 Lưu ý cho shop:</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Lời nhắn..."
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
    elevation: 10, // Hiệu ứng bóng trên Android
    shadowColor: "black", // Màu bóng
    shadowOffset: { width: 0, height: -5 }, // Điều chỉnh hướng bóng (hướng lên trên)
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 5, // Bán kính làm mờ bóng
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  addressText: {
    fontSize: 16,
    marginTop: 10,
  },
  orderSummaryText: {
    fontSize: 16,
    marginTop: 10,
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
    backgroundColor: "green",
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
