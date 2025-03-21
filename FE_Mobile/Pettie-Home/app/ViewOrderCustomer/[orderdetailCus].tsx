import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { getOrderDetailByCode } from "@/services/user/order";
import { format } from "date-fns";
import { Orders } from "@/services/types";

const statusMapping: Record<Orders["status"], any> = {
  Pending: "Chờ xác nhận",
  AwaitingSchedule: "Chờ ngày hẹn",
  InProgress: "Đến cuộc hẹn",
  Completed: "Đã hoàn thành",
  Canceled: "Đã hủy",
};

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState<Orders | null>(null);
  const { orderNumber } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderNumber) {
        try {
          const orderData = await getOrderDetailByCode(orderNumber as string);
          console.log("Thông tin đơn hàng lấy được:", orderData);
          setOrderDetails(orderData);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      }
    };

    fetchOrderDetails();
  }, [orderNumber]);

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
      {orderDetails && (
        <FlatList
          data={[orderDetails]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, marginTop: 100 }}>
              <Text style={styles.statusOrder}>
                <Entypo name="controller-record" size={18} color="white" />
                <Text style={styles.statusText}>
                  {statusMapping[item.status as Orders["status"]] ||
                    "Trạng thái không xác định"}
                </Text>
              </Text>
              <View style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Mã đơn hàng:</Text>
                    <Text style={styles.value}>{item.orderNumber}</Text>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <Text style={styles.value}>{item.buyerPhone}</Text>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <Text style={styles.value}>{item.buyerAddress}</Text>
                    <Text style={styles.label}>Thời gian hẹn:</Text>
                    <Text style={styles.value}>
                      {item.appointmentDate
                        ? format(
                            new Date(item.appointmentDate),
                            "HH-mm - dd/MM/yyyy"
                          )
                        : "Không có thời gian hẹn"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.carddetail}>
                <Text style={styles.sectionHeader}>Chi tiết đơn hàng</Text>
                <FlatList
                  nestedScrollEnabled={true}
                  data={item.orderDetails}
                  keyExtractor={(detail) => detail.code}
                  renderItem={({ item: detail }) => (
                    <View style={styles.itemRow}>
                      {detail.shopService &&
                        detail.shopService.imageFileName && (
                          <Image
                            source={{
                              uri: detail.shopService.image
                                ? `https://pettiehome.online/web/${detail.shopService.image}`
                                : `https://pettiehome.online/web/${detail.shopService.imageFileName}`,
                            }}
                            style={styles.image}
                          />
                        )}
                      {detail.product && detail.product.imageFileName && (
                        <Image
                          source={{
                            uri: detail.product.image
                              ? `https://pettiehome.online/web/${detail.product.image}`
                              : `https://pettiehome.online/web/${detail.product.imageFileName}`,
                          }}
                          style={styles.image}
                        />
                      )}
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemText}>
                          {detail.shopService
                            ? detail.shopService.name
                            : detail.product?.name}
                        </Text>
                        <Text style={styles.itemPrice}>
                          {detail.price.toLocaleString()} đ
                        </Text>
                      </View>
                      <Text style={styles.quantity}>x {detail.quantity}</Text>
                    </View>
                  )}
                />
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Tổng đơn hàng:</Text>
                  <Text style={styles.totalAmount}>
                    {item.totalAmount.toLocaleString()} đ
                  </Text>
                </View>
              </View>

              <View style={styles.cardpayment}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.section}>Phương thức thanh toán</Text>
                  <Text style={styles.infoValue}>
                    {item.paymentMethod === "Cash"
                      ? "Tiền mặt"
                      : item.paymentMethod === "BankTransfer"
                      ? "QR Pay"
                      : item.paymentMethod}
                  </Text>
                </View>
              </View>

              <View style={styles.cardNote}>
                <Text style={styles.sectionHeader}>Lưu ý cho shop</Text>
                {item.note ? (
                  <Text style={styles.noteText}>{item.note}</Text>
                ) : (
                  <Text style={styles.noteText2}>
                    Không có lưu ý cho cửa hàng
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
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
    paddingTop: 45,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 10,
  },
  backButton: {
    flexDirection: "row",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
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
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#222",
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    paddingBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 14,
    fontWeight: "600",
    flexWrap: "wrap",
    maxWidth: "90%",
    marginBottom: 3,
  },
  quantity: {
    fontSize: 14,
    color: "#777",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ed7c44",
    alignItems: "flex-end",
  },
  totalContainer: {
    borderColor: "#333",

    borderTopWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 14,
    fontWeight: "700",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ed7c44",
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
  noteText2: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  statusText: {
    fontSize: 14.5,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 5,
    marginLeft: 5,
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
  section: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    flex: 3,
    flexShrink: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#ed7c44",
    fontWeight: "bold",
  },
});
