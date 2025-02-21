import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const initialOrders = [
  {
    id: "1",
    shopName: "Tiệm nhà Bụp",
    time: "15:00 - 20/10/2024",
    services: [
      {
        name: "Tắm cơ bản cho chó < 4kg",
        quantity: 1,
        price: 100,
        image:
          "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
      },
      {
        name: "Pate mèo kucinta gói 80g",
        quantity: 1,
        price: 10,
        image:
          "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
      },
      {
        name: "Cây cào móng chó mèo",
        quantity: 1,
        price: 220,
        image:
          "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
      },
    ],
    total: "365.000 VNĐ",
    status: "Chờ xác nhận",
  },
  {
    id: "2",
    shopName: "Tiệm Spa nhà Bụp",
    time: "10:00 - 21/10/2024",
    services: [
      {
        name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg",
        quantity: 2,
        price: 220,
        image:
          "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg",
      },
    ],
    total: "440.000 VNĐ",
    status: "Chờ xác nhận",
  },
  {
    id: "3",
    shopName: "Pet Mart Juddy",
    time: "10:00 - 21/10/2024",
    services: [
      {
        name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg",
        quantity: 2,
        price: 220,
        image:
          "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg",
      },
    ],
    total: "935.000 VNĐ",
    status: "Chờ ngày hẹn",
  },
  {
    id: "4",
    shopName: "Nguyễn Văn A",
    time: "10:00 - 21/10/2024",
    services: [
      {
        name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg",
        quantity: 2,
        price: 220,
        image:
          "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg",
      },
    ],
    total: "935.000 VNĐ",
    status: "Chờ ngày hẹn",
  },
  {
    id: "5",
    shopName: "Nguyễn Văn A",
    time: "10:00 - 21/10/2024",
    services: [
      {
        name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg",
        quantity: 2,
        price: 220,
        image:
          "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg",
      },
    ],
    total: "935.000 VNĐ",
    status: "Đang diễn ra",
  },
];

const tabs = [
  "Chờ xác nhận",
  "Chờ ngày hẹn",
  "Đang diễn ra",
  "Đã hoàn thành",
  "Đã hủy",
];

const OrderActions = ({
  orderStatus,
  onAccept,
  onCancel,
}: {
  orderStatus: string;
  onAccept: () => void;
  onCancel: () => void;
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Text style={styles.buttonText}>Chi tiết đơn</Text>
      </TouchableOpacity>
      {orderStatus === "Chờ xác nhận" && (
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonTextCancel}>Hủy Đơn</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const OrderCard = ({
  order,
  onPress,
  onToggleExpand,
  isExpanded,
  onCancelOrder,
}: {
  order: (typeof initialOrders)[0];
  onPress: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
  onCancelOrder: () => void;
}) => {
  const visibleServices = isExpanded
    ? order.services
    : order.services.slice(0, 2);
  const shouldShowToggle = order.services.length > 2;

  return (
    <TouchableOpacity style={styles.orderCard} onPress={onPress}>
      <View style={styles.buttonorder}>
        <Text style={styles.orderCustomer}>
          <Entypo name="shop" size={15} color="#ed7c44" /> {order.shopName}
        </Text>
        <Text style={styles.orderTime}>{order.status}</Text>
      </View>

      <View style={styles.orderServices}>
        {visibleServices.map((service, index) => (
          <View key={index} style={styles.orderServiceRow}>
            {service.image && (
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
            )}

            <View style={{ flex: 1 }}>
              <Text
                style={styles.serviceName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {service.name}
              </Text>
              <View
                style={{
                  alignItems: "flex-end",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "600", color: "#666" }}>
                  {service.price}.000
                </Text>
                <Text style={styles.serviceQuantity}>x{service.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {shouldShowToggle && (
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          style={styles.expandButton}
        >
          <Text style={styles.expandButtonText}>
            {isExpanded ? "Thu gọn ▲" : "Xem thêm ▼"}
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.orderTotal}>
        Tổng đơn hàng: <Text style={styles.orderPrice}>{order.total}</Text>
      </Text>
      <OrderActions
        orderStatus={order.status}
        onAccept={() => {}}
        onCancel={onCancelOrder}
      />
    </TouchableOpacity>
  );
};

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
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function OrderCustomer() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<string>>(null);
  const router = useRouter();

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === activeTab),
    [orders, activeTab]
  );

  const onTabPress = useCallback((index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * SCREEN_WIDTH,
      animated: true,
    });
    setActiveTab(tabs[index]);
  }, []);

  const handleOrderDetail = useCallback(
    (orderId: string) => {
      // router.push(`/OrderShop/${orderId}`);
      router.push(`/ViewOrderCustomer/${orderId}`);
    },
    [router]
  );

  const toggleExpand = useCallback((orderId: string) => {
    setExpandedOrders((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(orderId)) {
        newExpanded.delete(orderId);
      } else {
        newExpanded.add(orderId);
      }
      return newExpanded;
    });
  }, []);

  const handleCancelOrder = useCallback((orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
    Alert.alert(" ✅ Hủy thành công", "Đơn hàng đã được hủy thành công.");
  }, []);

  const renderOrder = useCallback(
    ({ item }: { item: (typeof initialOrders)[0] }) => {
      const isExpanded = expandedOrders.has(item.id);
      return (
        <OrderCard
          order={item}
          onPress={() => handleOrderDetail(item.id)}
          onToggleExpand={() => toggleExpand(item.id)}
          isExpanded={isExpanded}
          onCancelOrder={() => handleCancelOrder(item.id)}
        />
      );
    },
    [expandedOrders, handleOrderDetail, toggleExpand, handleCancelOrder]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quản lí đơn hàng</Text>
      </View>

      {/* Tabs */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />

      {/* Content */}
      <Animated.FlatList
        ref={flatListRef}
        data={tabs}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setActiveTab(tabs[index]);
        }}
        renderItem={() => (
          <View style={styles.page}>
            <FlatList
              data={filteredOrders}
              keyExtractor={(order) => order.id}
              renderItem={renderOrder}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
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
  menuTrigger: {
    marginLeft: 7,
  },
  page: { width: SCREEN_WIDTH, paddingTop: 16, paddingHorizontal: 12 },
  list: { paddingBottom: 16 },
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
  orderCustomer: { fontSize: 16, fontWeight: "bold", color: "#333" },
  orderTime: {
    fontSize: 14,
    color: "#ed7c44",
    marginVertical: 4,
    fontWeight: "700",
  },
  orderServices: { marginTop: 8, marginBottom: 5 },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#555",
  },
  activeModalOption: {
    backgroundColor: "#ed7c44",
  },
  activeModalOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderServiceRow: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  serviceQuantity: {
    marginRight: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  acceptButton: {
    backgroundColor: "#ed7c44",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ed7c44",
    borderWidth: 2, // Độ dày của viền
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ed7c44",
    borderWidth: 2, // Độ dày của viền
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonTextCancel: {
    color: "#ed7c44",
    fontWeight: "bold",
  },
  expandButton: {
    alignSelf: "center",

    paddingVertical: 4,
  },
  expandButtonText: {
    color: "#696969",
    fontSize: 15,
    fontWeight: "400",
  },
  serviceImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
});
