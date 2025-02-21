import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

const statusSteps = [
  "Chờ xác nhận",
  "Chờ ngày hẹn",
  "Đến cuộc hẹn",
  "Đang tiến hành",
  "Đã hoàn thành",
];

const orderDetails = {
  orderId: "#1009",
  status: "Chờ xác nhận",
  time: "27/01/2024 - 23:07:42",
  scheduledTime: "28/01/2024 - 10:00:00",
  items: [
    {
      id: "1",
      name: "Tắm cơ bản cho chó < 4kg ",
      price: 100000,
      quantity: 1,
      image: "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
    },
    {
      id: "2",
      name: "Pate mèo kucinta gói 80g",
      price: 10000,
      quantity: 1,
      image: "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
    },
    {
      id: "3",
      name: "Cây cào móng chó mèo",
      price: 220000,
      quantity: 1,
      image:
        "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
    },
  ],
  subtotal: 350000,
  shipping: 25000,
  total: 365000,
  address: "Đường 3/2, phường Long Thạnh Mỹ, Quận 9, HCM",
  paymentMethod: "Tiền mặt",
  paymentTime: "28/01/2024 - 10:05:00",
  customerName: "Nguyễn Văn A",
  customerPhone: "0123456789",
  customerNote: "Vui lòng gọi điện trước khi đến để xác nhận lịch hẹn.",
};

export default function OrderDetails() {
  const router = useRouter();
  const [order, setOrder] = useState(orderDetails);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="left" size={24} color="#fff" />
          <Text style={styles.header}>Thông tin đơn hàng</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[order]}
        keyExtractor={(item) => item.orderId}
        renderItem={() => (
          <View style={{ padding: 10, marginTop: 80 }}>
            <Text style={styles.statusOrder}>Tiệm nhà Bụp</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                {/* Cột trái */}
                <View style={styles.column}>
                  <Text style={styles.label}>Mã đơn hàng:</Text>
                  <Text style={styles.value}>{orderDetails.orderId}</Text>

                  <Text style={styles.label}>Số điện thoại:</Text>
                  <Text style={styles.value}>{orderDetails.customerPhone}</Text>

                  <Text style={styles.label}>Địa chỉ:</Text>
                  <Text style={styles.value}>{orderDetails.address}</Text>
                </View>

                {/* Cột phải */}
                <View style={styles.column}>
                  <TouchableOpacity
                    style={styles.statusContainer}
                    onPress={() => {
                      const currentIndex = statusSteps.indexOf(order.status);
                      if (currentIndex < statusSteps.length - 1) setIsModalVisible(true);
                    }}
                  >
                    <View style={styles.status}>
                      <Entypo name="controller-record" size={20} color="#25923E" />
                      <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.timeContainer}>
                    <Text style={styles.label}>Thời gian đã tạo:</Text>
                    <Text style={styles.value}>{orderDetails.time}</Text>

                    <Text style={styles.label}>Thời gian hẹn:</Text>
                    <Text style={styles.value}>{orderDetails.scheduledTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.carddetail}>
              <Text style={styles.sectionHeader}>Chi tiết đơn hàng</Text>
              <FlatList
                nestedScrollEnabled={true}
                data={orderDetails.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        {item.price.toLocaleString()} đ
                      </Text>
                    </View>
                    <Text style={styles.quantity}>x {item.quantity}</Text>
                  </View>
                )}
              />
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng đơn hàng:</Text>
                <Text style={styles.totalAmount}>
                  {orderDetails.subtotal.toLocaleString()} đ
                </Text>
              </View>
              <View style={styles.totalContainerFee}>
                <Text style={styles.totalText}>Phí vận chuyển:</Text>
                <Text style={styles.totalAmount}>
                  {orderDetails.shipping.toLocaleString()} đ
                </Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.finalTotalText}>Tổng cộng:</Text>
                <Text style={styles.finalTotalAmount}>
                  {orderDetails.total.toLocaleString()} đ
                </Text>
              </View>
            </View>

            <View style={styles.cardpayment}>
              <View style={styles.sectionHeader}>
                <Text style={styles.section}>Phương thức thanh toán</Text>
                <Text style={styles.infoValue}>
                  {orderDetails.paymentMethod}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.infoLabel}>Thời gian đặt hàng:</Text>
                  <Text style={styles.value}>{orderDetails.time}</Text></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.infoLabel}>Thời gian thanh toán:</Text>
                  <Text style={styles.value}>{orderDetails.paymentTime}</Text></View>
              </View>
            </View>

            <View style={styles.cardNote}>
              <Text style={styles.sectionHeader}>Lưu ý của shop</Text>
              <Text style={styles.noteText}>{orderDetails.customerNote}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "#e9f1ff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#699BF4",
    padding: 10,
    paddingBottom: 20,
    paddingTop: 35,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    marginRight: 10,
    flexDirection: "row",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statusOrder: {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#e6845e",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 10,
  },
  status: {
    flexDirection: "row", // Căn theo hàng ngang
    alignItems: "center", // Căn giữa icon và chữ
    justifyContent: "center", // Căn giữa nội dung theo chiều ngang
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#25923E",
    marginRight: 10
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#25923E",
    marginLeft: 5,
  },
  timeContainer: {
    alignItems: "flex-start",  // Căn thời gian về bên phải
    textAlign: "right",
    marginLeft: 20
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "column",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  infoValue: {
    fontSize: 14,
    color: "#ed7c44",
    fontWeight: "bold"
  },
  carddetail: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#222",
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    paddingBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    flex: 3,
    flexShrink: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "medium",
    flexWrap: "wrap", // Cho phép xuống dòng
    maxWidth: "90%",
    marginBottom: 3,
  },
  quantity: {
    fontSize: 14,
    color: "#777",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ed7c44",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  totalContainerFee: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    margin: 5,
  },
  totalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 14,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  finalTotalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  finalTotalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed7c44",
  },
  cardinfo: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardpayment: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  cardNote: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginBottom: 50,
  },
  noteText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});
