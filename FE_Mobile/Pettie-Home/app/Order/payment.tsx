import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import logo from "../../assets/images/pay.jpg";

const Payment = () => {
  const { address } = useLocalSearchParams();

  // Thông tin đơn hàng mẫu
  const customerName = "Nguyễn Văn B";
  const phoneNumber = "0886133779";
  const defaultAddress =
    "Tòa Bs16, 88 Phước Thiện, Khu phố 29, Quận 9, Hồ Chí Minh";
  const shippingAddress = address || defaultAddress;
  const orderTotal = 100 + 2 * 10 + 220 + 25; // Tổng đơn hàng + phí ship

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin đơn hàng</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Tên khách hàng:</Text>
        <Text style={styles.value}>{customerName}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{phoneNumber}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Tổng giá trị đơn hàng:</Text>
        <Text style={styles.value}>{orderTotal}.000đ</Text>
      </View>

      <Image source={logo} style={styles.logo} />

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#ed7c44",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 280,
    marginTop: -180,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
