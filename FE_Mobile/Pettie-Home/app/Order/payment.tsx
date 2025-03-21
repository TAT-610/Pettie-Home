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
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons"; // Import icon
import QRCode from "react-native-qrcode-svg";
import { getOrderByCodeNumber } from "@/services/user/order"; // Import hàm getOrderByCodeNumber

const Payment = () => {
  const { qrCode, orderCode } = useLocalSearchParams();
  const router = useRouter();

  // Trạng thái modal
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null); // State để lưu thông tin đơn hàng

  // Thông tin đơn hàng mẫu
  const customerName = "Lê Như Ngọc";

  // Tổng đơn hàng + phí ship

  // Hàm gọi để lấy thông tin đơn hàng
  const fetchOrderData = async () => {
    try {
      const data = await getOrderByCodeNumber(orderCode as string);
      console.log("Order Data:", data); // Log dữ liệu đơn hàng
      setOrderData(data); // Lưu thông tin đơn hàng vào state
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData(); // Gọi hàm khi component được mount
  }, [orderCode]);

  // Hàm xử lý xác nhận thanh toán
  const handlePayment = () => {
    setLoading(true); // Hiển thị modal loading

    setTimeout(() => {
      setLoading(false); // Tắt modal loading
      setSuccess(true); // Hiển thị modal thanh toán thành công
    }, 4000); // Chạy sau 4 giây
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* Thanh điều hướng */}
      <View style={styles.navigation}>
        <Text style={styles.textpay}>Xác nhận thanh toán</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Mã đơn hàng:</Text>
          <Text style={styles.value}>{orderCode}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tên người nhận:</Text>
          <Text style={styles.value}>{customerName}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Tổng giá trị đơn hàng:</Text>
          <Text style={styles.value}>
            {orderData ? formatCurrency(orderData.totalAmount) : "Đang tải..."}
          </Text>
        </View>
        <View style={styles.QRCode}>
          <QRCode value={qrCode as string} size={200} />
        </View>

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
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  textpay: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
    textAlign: "center",
    marginHorizontal: "auto",
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
  QRCode: {
    marginHorizontal: "auto",
  },
});
