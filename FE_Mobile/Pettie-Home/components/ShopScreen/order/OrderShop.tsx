import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { getOrderByShop, updateOrderStatus } from "@/services/shop/apiOrder";
import { Orders } from "@/services/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const tabs = ["Chờ xác nhận", "Chờ ngày hẹn", "Đang diễn ra", "Đã hoàn thành", "Đã hủy"];
type OrderStatus = "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled";

// Hàm ánh xạ activeTab sang status
const mapTabToStatus = (tab: string) => {
    switch (tab) {
        case "Chờ xác nhận":
            return "Pending";
        case "Chờ ngày hẹn":
            return "AwaitingSchedule";
        case "Đang diễn ra":
            return "InProgress";
        case "Đã hoàn thành":
            return "Completed";
        case "Đã hủy":
            return "Canceled";
        default:
            return undefined;
    }
};

// Hàm chuyển đổi trạng thái từ tiếng Anh sang tiếng Việt
const mapStatusToVietnamese = (status: string) => {
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

const getNextStatus = (currentStatus: OrderStatus): OrderStatus | undefined => {
    switch (currentStatus) {
        case "Pending":
            return "AwaitingSchedule";
        case "AwaitingSchedule":
            return "InProgress";
        case "InProgress":
            return "Completed";
        case "Completed":
            return undefined;
        case "Canceled":
            return undefined;
        default:
            return undefined;
    }
};

const TabBar = ({ tabs, activeTab, onTabPress }: { 
    tabs: string[]; 
    activeTab: string; 
    onTabPress: (tab: string) => void; 
}) => {
    return (
        <View style={styles.stickyHeader}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onTabPress(tab)}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const OrderActions = ({ 
    orderId, 
    currentStatus, 
    onAccept, 
    onCancel 
}: { 
    orderId: string; 
    currentStatus: string; 
    onAccept: () => void; 
    onCancel: () => void; 
}) => {
    const handleAccept = async () => {
        try {
            const nextStatus = getNextStatus(currentStatus as OrderStatus);
            if (!nextStatus) {
                Alert.alert("Lỗi", "Không thể chuyển trạng thái.");
                return;
            }
            await updateOrderStatus(orderId, nextStatus);
            onAccept();
            Alert.alert("Thành công", "Đơn hàng đã được cập nhật trạng thái.");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái.");
        }
    };

    if (currentStatus !== "Pending") {
        return null;
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                <Text style={styles.buttonText}>Nhận Đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonTextCancel}>Hủy Đơn</Text>
            </TouchableOpacity>
        </View>
    );
};

const OrderCard = ({ 
    order, 
    onPress, 
    onToggleExpand, 
    isExpanded,
    onStatusUpdate 
}: { 
    order: Orders; 
    onPress: () => void; 
    onToggleExpand: () => void; 
    isExpanded: boolean;
    onStatusUpdate: () => void; 
}) => {
    const orderDetails = Array.isArray(order.orderDetails) ? order.orderDetails : [];
    const visibleOrderDetails = isExpanded ? orderDetails : orderDetails.slice(0, 2);
    const shouldShowToggle = orderDetails.length > 2;

    return (
        <TouchableOpacity style={styles.orderCard} onPress={onPress}>
            <View style={styles.buttonorder}>
                <Text style={styles.orderCustomer}>{order.buyerName}</Text>
                <Text style={styles.orderStatus}>{mapStatusToVietnamese(order.status)}</Text>
            </View>

            <View style={styles.orderServices}>
                {visibleOrderDetails.map((detail, index) => (
                    <View key={index} style={styles.orderServiceRow}>
                        <Text style={styles.serviceQuantity}>x{detail.quantity}</Text>
                        <Text style={styles.serviceName}>{detail.shopService?.name || "Không có tên"}</Text>
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
                        {isExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                    </Text>
                </TouchableOpacity>
            )}
            <Text style={styles.orderTotal}>Tổng đơn hàng: <Text style={styles.orderPrice}>{order.totalAmount.toLocaleString()} VND</Text></Text>
            <OrderActions 
                orderId={order.id} 
                currentStatus={order.status} 
                onAccept={onStatusUpdate} 
                onCancel={() => {}} 
            />
        </TouchableOpacity>
    );
};

export default function OrderShop() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // Gọi API để lấy danh sách đơn hàng
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const status = mapTabToStatus(activeTab);
                const ordersData = await getOrderByShop({
                    status,
                    pageNumber: 1,
                    pageSize: 10,
                });

                const processedOrders = ordersData.map((order: any) => ({
                    ...order,
                    orderDetails: Array.isArray(order.orderDetails) ? order.orderDetails : [],
                }));

                setOrders(processedOrders);
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [activeTab]);

    const filteredOrders = useMemo(
        () => orders.filter(order => mapStatusToVietnamese(order.status) === activeTab),
        [orders, activeTab]
    );

    const onTabPress = useCallback((tab: string) => {
        setActiveTab(tab);
    }, []);

    const handleOrderDetail = useCallback((orderNumber: string) => {
        router.push({
            pathname: '/OrderShop/[orderdetailShop]',
            params: { orderdetailShop: orderNumber },
        });
    }, [router]);

    const toggleExpand = useCallback((orderId: string) => {
        setExpandedOrders(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(orderId)) {
                newExpanded.delete(orderId);
            } else {
                newExpanded.add(orderId);
            }
            return newExpanded;
        });
    }, []);

    const renderOrder = useCallback(({ item }: { item: Orders }) => {
        const isExpanded = expandedOrders.has(item.id);

        const handleStatusUpdate = () => {
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === item.id ? { ...order, status: getNextStatus(order.status as OrderStatus) || order.status } : order
                )
            );
        };

        return (
            <OrderCard
                order={item}
                onPress={() => handleOrderDetail(item.orderNumber)}
                onToggleExpand={() => toggleExpand(item.id)}
                isExpanded={isExpanded}
                onStatusUpdate={handleStatusUpdate}
            />
        );
    }, [expandedOrders, handleOrderDetail, toggleExpand]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Quản lí đơn hàng</Text>
            </View>

            {/* Tabs */}
            <TabBar tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />

            {/* Content */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text>Đang tải đơn hàng...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(order) => order.id}
                    renderItem={renderOrder}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e9f1ff" },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#699BF4",
        padding: 30,
        paddingTop: 60,
    },
    header: { fontSize: 24, fontWeight: "bold", color: "#fff" },
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
    list: { padding: 16, paddingBottom: 16 },
    orderCard: {
        margin: 15,
        backgroundColor: "#fff",
        padding: 16,
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
    },
    orderCustomer: { fontSize: 16, fontWeight: "bold", color: "#333" },
    orderStatus: {
        fontSize: 14,
        color: "#ed7c44",
        marginVertical: 4,
        fontWeight: "700",
    },
    orderServices: { marginTop: 8, marginBottom: 5 },
    orderTotal: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 10,
    },
    orderPrice: {
        color: '#ed7c44',
    },
    orderServiceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    serviceQuantity: {
        marginRight: 8,
        fontSize: 14,
        color: "#555",
        fontWeight: "600",
    },
    serviceName: {
        fontSize: 14,
        fontWeight: "medium",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        gap: 20,
        marginTop: 20,
    },
    acceptButton: {
        backgroundColor: '#ed7c44',
        padding: 10,
        borderRadius: 5,
        borderColor: "#ed7c44",
        borderWidth: 2,
    },
    cancelButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: "#ed7c44",
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonTextCancel: {
        color: '#ed7c44',
        fontWeight: 'bold',
    },
    expandButton: {
        alignSelf: 'center',
        marginTop: 8,
        paddingVertical: 4,
    },
    expandButtonText: {
        color: '#696969',
        fontSize: 15,
        fontWeight: '400',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});