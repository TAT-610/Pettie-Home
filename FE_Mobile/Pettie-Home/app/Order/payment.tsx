import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons"; // Import icon
import QRCode from "react-native-qrcode-svg";

const Payment = () => {
  const { address, qrCode } = useLocalSearchParams();
  const router = useRouter();

  // Trạng thái modal
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Thông tin đơn hàng mẫu
  const customerName = "Trần Ánh Tuyết";
  const phoneNumber = "0886133779";
  const defaultAddress =
    "Tòa Bs16, 88 Phước Thiện, Khu phố 29, Quận 9, Hồ Chí Minh";
  const shippingAddress = address || defaultAddress;
  const orderTotal = 100 + 2 * 10 + 220 + 25; // Tổng đơn hàng + phí ship

  // Hàm xử lý xác nhận thanh toán
  const handlePayment = () => {
    setLoading(true); // Hiển thị modal loading

    setTimeout(() => {
      setLoading(false); // Tắt modal loading
      setSuccess(true); // Hiển thị modal thanh toán thành công
    }, 4000); // Chạy sau 4 giây
  };

  return (
    <View style={styles.container}>
      {/* Thanh điều hướng */}
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.push("/Order/OrderCustomer")}
          style={styles.backButton}
        />
        <Text style={styles.textpay}>Quay lại</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

        <QRCode value={qrCode as string} size={200} />

        <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
          <Text style={styles.buttonText}>Xác nhận đã thanh toán</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Loading */}
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#ed7c44" />
            <Text style={styles.modalText}>Đang xử lý thanh toán...</Text>
          </View>
        </View>
      </Modal>

      {/* Modal Thanh toán thành công */}
      <Modal transparent visible={success} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.successText}>🎉 Thanh toán thành công!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSuccess(false);
                router.push("/(tabs)/appointment");
              }}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 27,
    backgroundColor: "#699BF4",

    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  textpay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    marginTop: 20,
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
    paddingHorizontal: 20,
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
    backgroundColor: "#ed7c44",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 280,
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});
