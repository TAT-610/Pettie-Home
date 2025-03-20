import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useRouter } from "expo-router";
import { getOrdersByStatus } from "@/services/user/order";
import { Orders } from "@/services/types";
import { format, parseISO } from "date-fns";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const tabs = [
  "Pending", // Chờ xác nhận
  "AwaitingSchedule", // Chờ ngày hẹn
  "InProgress", // Đang diễn ra
  "Completed", // Đã hoàn thành
  "Canceled", // Đã hủy
];

const tabLabels = [
  "Chờ xác nhận",
  "Chờ ngày hẹn",
  "Đang diễn ra",
  "Đã hoàn thành",
  "Đã hủy",
];

const TabBar = ({
  tabs,
  activeTab,
  onTabPress,
}: {
  tabs: string[];
  activeTab: string;
  onTabPress: (index: number) => void;
}) => {
  return (
    <View style={styles.stickyHeader}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabPress(index)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tabLabels[index]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const OrderCard = ({
  order,
  onPress,
}: {
  order: Orders;
  onPress: () => void;
}) => {
  const formattedDate = format(
    parseISO(order.appointmentDate),
    "dd/MM/yyyy-HH:mm"
  );

  return (
    <TouchableOpacity style={styles.orderCard} onPress={onPress}>
      <View style={styles.buttonorder}>
        <Text style={styles.orderCustomer}>
          <Feather name="shopping-bag" size={15} color="#ed7c44" /> Mã đơn:{" "}
          {order.orderNumber}
        </Text>
        <Text style={styles.orderTime}>{formattedDate}</Text>
      </View>
      <View style={styles.orderDetails}>
        {order.orderDetails.slice(0, 2).map((detail, index) => (
          <View key={index} style={styles.serviceRow}>
            {detail.shopService && detail.shopService.imageFileName && (
              <Image
                source={{
                  uri: detail.shopService.image
                    ? `https://pettiehome.online/web/${detail.shopService.image}`
                    : `https://pettiehome.online/web/${detail.shopService.imageFileName}`,
                }}
                style={styles.serviceImage}
              />
            )}
            {detail.product && detail.product.imageFileName && (
              <Image
                source={{
                  uri: detail.product.image
                    ? `https://pettiehome.online/web/${detail.product.image}`
                    : `https://pettiehome.online/web/${detail.product.imageFileName}`,
                }}
                style={styles.serviceImage}
              />
            )}
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>
                {detail.shopService
                  ? detail.shopService.name
                  : detail.product?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text style={styles.serviceQuantity2}>
                  {detail.price.toLocaleString()}đ
                </Text>
                <Text style={styles.serviceQuantity}>x{detail.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
        {order.orderDetails.length > 2 && (
          <Text style={styles.seeMoreText}>Xem thêm</Text>
        )}
      </View>
      <Text style={styles.orderTotal}>
        Tổng đơn hàng:{" "}
        <Text style={styles.orderPrice}>
          {order.totalAmount.toLocaleString()} VND
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const getStatusFromTab = (
  tab: string
):
  | "Pending"
  | "AwaitingSchedule"
  | "InProgress"
  | "Completed"
  | "Canceled"
  | undefined => {
  switch (tab) {
    case "Pending":
      return "Pending";
    case "AwaitingSchedule":
      return "AwaitingSchedule";
    case "InProgress":
      return "InProgress";
    case "Completed":
      return "Completed";
    case "Canceled":
      return "Canceled";
    default:
      return undefined;
  }
};

export default function OrderCustomer() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersByStatus({
          status: getStatusFromTab(activeTab),
          pageNumber: 1,
          pageSize: 10,
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        Alert.alert("Lỗi", "Không thể lấy danh sách đơn hàng.");
      }
    };

    fetchOrders();
  }, [activeTab]);

  const onTabPress = useCallback((index: number) => {
    setActiveTab(tabs[index]);
  }, []);

  const renderOrder = useCallback(
    ({ item }: { item: Orders }) => {
      return (
        <OrderCard
          order={item}
          onPress={() => router.push(`/ViewOrderCustomer/${item.orderNumber}`)}
        />
      );
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quản lý đơn hàng</Text>
      </View>
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f1ff" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#699BF4",
    padding: 15,
    paddingTop: 40,
  },
  header: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  stickyHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 10,
    backgroundColor: "#699BF4",
  },
  tabsContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#ed7c44",
  },
  tabText: {
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
  },
  orderCard: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  orderCustomer: { fontSize: 15, fontWeight: "600", color: "#444" },
  orderTime: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
    fontWeight: "700",
  },
  orderDetails: {
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  serviceRow: {
    flexDirection: "row",

    marginBottom: 10,
  },
  serviceImage: {
    width: 65,
    height: 65,
    borderRadius: 5,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14.5,
    fontWeight: "600",
  },
  serviceQuantity: {
    fontSize: 13.5,
    color: "#666",
    fontWeight: "600",
  },
  serviceQuantity2: {
    fontSize: 13.5,
    color: "#ed7c44",
    fontWeight: "600",
  },
  orderTotal: {
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    flex: 1,
  },
  orderPrice: {
    color: "#ed7c44",
  },
  list: { paddingBottom: 16 },
  seeMoreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#699BF4",
    borderRadius: 5,
    alignItems: "center",
  },
  seeMoreText: {
    color: "#777",
    fontWeight: "700",
    textAlign: "center",
  },
});
