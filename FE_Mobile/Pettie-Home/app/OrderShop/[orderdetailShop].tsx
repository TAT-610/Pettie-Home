import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { getOrderDetailByCode, updateOrderStatus } from "@/services/shop/apiOrder";
import { Orders } from "@/services/types";

const statusSteps = [
  "Pending",
  "AwaitingSchedule",
  "InProgress",
  "Completed",
  "Canceled",
];

const mapStatusToText = (status: string) => {
  switch (status) {
    case "Pending":
      return "Chờ xác nhận";
    case "AwaitingSchedule":
      return "Chờ ngày hẹn";
    case "InProgress":
      return "Đang diễn ra";
    case "Completed":
      return "Đã hoàn thành";
    case "Canceled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default function OrderDetails() {
  const router = useRouter();
  const [order, setOrder] = useState<Orders | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái mở rộng

  const { orderdetailShop } = useLocalSearchParams();
  console.log("orderdetailShop in detail:", orderdetailShop);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        if (!orderdetailShop) {
          throw new Error("Mã đơn hàng không được cung cấp");
        }
        setLoading(true);
        const orderDetail = await getOrderDetailByCode(orderdetailShop as string);
        if (!orderDetail) {
          throw new Error("Không tìm thấy đơn hàng");
        }
        setOrder(orderDetail);
      } catch (error: any) {
        console.error("Error fetching order details:", error);
        Alert.alert("Lỗi", error.message || "Không thể tải thông tin đơn hàng", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderdetailShop, router]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      if (!order) return;

      const updatedOrder = await updateOrderStatus(
        order.id,
        newStatus as "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled"
      );
      setOrder(updatedOrder);
      Alert.alert("Thành công", "Cập nhật trạng thái thành công.");
    } catch (error) {
      console.error("Error updating order status:", error);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const showStatusChangePopup = () => {
    if (!order) return;

    const currentIndex = statusSteps.indexOf(order.status);
    if (currentIndex < statusSteps.length - 1) {
      setIsModalVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải thông tin đơn hàng...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy thông tin đơn hàng.</Text>
      </View>
    );
  }

  // Logic giống OrderCard
  const orderDetails = Array.isArray(order.orderDetails) ? order.orderDetails : [];
  const visibleOrderDetails = isExpanded ? orderDetails : orderDetails.slice(0, 2);
  const shouldShowToggle = orderDetails.length > 2;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#fff" />
          <Text style={styles.header}>Thông tin đơn hàng</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => "header"}
        ListHeaderComponent={
          <>
            <Text style={styles.statusOrder}>Thông tin lịch hẹn</Text>
            <View style={styles.card}>
              <View style={styles.headerCard}>
                <Text style={styles.label}>Mã đơn hàng:</Text>
                <Text style={styles.value}>{order.orderNumber}</Text>
                <Text style={styles.label}>Thời gian đã tạo đơn:</Text>
                <Text style={styles.value}>{new Date(order.appointmentDate).toLocaleString()}</Text>
              </View>
              <View style={styles.headerCard}>
                <TouchableOpacity onPress={showStatusChangePopup}>
                  <View style={styles.status}>
                    <Entypo name="controller-record" size={24} color="#25923E" />
                    <Text style={styles.statusText}>{mapStatusToText(order.status)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cardinfo}>
              <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tên khách hàng:</Text>
                <Text style={styles.infoValue}>{order.buyerName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Số điện thoại:</Text>
                <Text style={styles.infoValue}>{order.buyerPhone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Địa chỉ:</Text>
                <Text style={styles.infoValue}>{order.buyerAddress}</Text>
              </View>
            </View>

            <View style={styles.carddetail}>
              <Text style={styles.sectionHeader}>Chi tiết đơn hàng</Text>
              <FlatList
                nestedScrollEnabled={true}
                data={visibleOrderDetails}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => {
                  const isService = !!item.shopService;
                  const isProduct = !!item.product;
                  const imageUrl = isService
                    ? `https://pettiehome.online/web/${item.shopService.imageUrl}`
                    : isProduct
                    ? `https://pettiehome.online/web/${item.product.image?.uri}`
                    : "https://via.placeholder.com/60"; // Hình ảnh mặc định nếu không có

                  return (
                    <View style={styles.itemRow}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                      />
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemText}>
                          {isService
                            ? item.shopService.name
                            : isProduct
                            ? item.product.name
                            : "Không có thông tin"}
                        </Text>
                      </View>
                      <Text style={styles.quantity}>x{item.quantity}</Text>
                    </View>
                  );
                }}
              />
              {shouldShowToggle && (
                <TouchableOpacity
                  onPress={() => setIsExpanded(!isExpanded)}
                  style={styles.expandButton}
                >
                  <Text style={styles.expandButtonText}>
                    {isExpanded ? "Thu gọn ▲" : "Xem thêm ▼"}
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng đơn hàng:</Text>
                <Text style={styles.totalAmount}>{order.totalAmount.toLocaleString()} đ</Text>
              </View>
              <View style={styles.totalContainerFee}>
                <Text style={styles.totalText}>Phí vận chuyển:</Text>
                <Text style={styles.totalAmount}>{order.shippingFee.toLocaleString()} đ</Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.finalTotalText}>Tổng cộng:</Text>
                <Text style={styles.finalTotalAmount}>{order.totalAmount.toLocaleString()} đ</Text>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View style={styles.cardpayment}>
              <View style={styles.sectionHeader}>
                <Text style={styles.section}>Phương thức thanh toán</Text>
                <Text style={styles.infoValue}>{order.paymentMethod}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Trạng thái thanh toán:</Text>
                <Text style={styles.value}>{order.paymentStatus || "Chưa thanh toán"}</Text>
              </View>
            </View>

            <View style={styles.cardNote}>
              <Text style={styles.sectionHeader}>Lưu ý của khách hàng</Text>
              <Text style={styles.noteText}>{order.note || "Không có lưu ý."}</Text>
            </View>
          </>
        }
        renderItem={null}
        contentContainerStyle={{ padding: 10, paddingTop: 110 }}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chuyển trạng thái</Text>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn chuyển trạng thái đơn hàng?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => {
                  if (!order) return;
                  const currentIndex = statusSteps.indexOf(order.status);
                  handleStatusChange(statusSteps[currentIndex + 1]);
                }}
              >
                <Text style={styles.modalButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  headerCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
    flex: 1,
    minWidth: Dimensions.get("window").width * 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: "#696969",
    fontWeight: "500",
    paddingBottom: 10,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#25923E",
    marginBottom: 15,
  },
  statusText: {
    color: "#25923E",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
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
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "medium",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  quantity: {
    fontSize: 16,
    color: "#777",
    fontWeight: "bold",
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
  infoRow: {
    flexDirection: "column",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
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
  expandButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  expandButtonText: {
    fontSize: 16,
    color: "#699BF4",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButtonCancel: {
    padding: 10,
    marginRight: 10,
  },
  modalButtonConfirm: {
    padding: 10,
    backgroundColor: "#25923E",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});