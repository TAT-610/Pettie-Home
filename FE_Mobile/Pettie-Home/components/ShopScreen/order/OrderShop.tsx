import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const orders = [
    {
        id: "1",
        customerName: "Trần Thị Thanh Thảo",
        services: [
            { name: "Cắt tỉa lông (Chó/Mèo) < 3kg", quantity: 1 },
            { name: "Tắm và vệ sinh (Chó/Mèo) < 3kg", quantity: 1 },
            { name: "Nhuọm lông (Chó/Mèo) < 6kg", quantity: 1 },
            { name: "Hạt mèo", quantity: 1 },
            { name: "Nệm nằm cho mèo", quantity: 1 },
        ],
        total: "900.000 VNĐ",
        status: "Chờ xác nhận",
    },
    {
        id: "2",
        customerName: "Nguyễn Văn A",
        services: [
            { name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg", quantity: 2 },
        ],
        total: "935.000 VNĐ",
        status: "Chờ xác nhận",
    },
    {
        id: "3",
        customerName: "Nguyễn Văn A",
        services: [
            { name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg", quantity: 2 },
        ],
        total: "935.000 VNĐ",
        status: "Chờ xác nhận",
    },
    {
        id: "4",
        customerName: "Nguyễn Văn A",
        services: [
            { name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg", quantity: 2 },
        ],
        total: "935.000 VNĐ",
        status: "Chờ ngày hẹn",
    },
    {
        id: "5",
        customerName: "Nguyễn Văn A",
        services: [
            { name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg", quantity: 2 },
        ],
        total: "935.000 VNĐ",
        status: "Đang diễn ra",
    },
];

const tabs = ["Chờ xác nhận", "Chờ ngày hẹn", "Đang diễn ra", "Đã hoàn thành", "Đã hủy"];

const OrderActions = ({ onAccept, onCancel }: { onAccept: () => void; onCancel: () => void }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
                <Text style={styles.buttonText}>Nhận Đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonTextCancel}>Hủy Đơn</Text>
            </TouchableOpacity>
        </View>
    );
};

const OrderCard = ({ order, onPress, onToggleExpand, isExpanded }: { order: typeof orders[0]; onPress: () => void; onToggleExpand: () => void; isExpanded: boolean }) => {
    const visibleServices = isExpanded ? order.services : order.services.slice(0, 2);
    const shouldShowToggle = order.services.length > 2;

    return (
        <TouchableOpacity style={styles.orderCard} onPress={onPress}>
            <View style={styles.buttonorder}>
                <Text style={styles.orderCustomer}>{order.customerName}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
            </View>

            <View style={styles.orderServices}>
                {visibleServices.map((service, index) => (
                    <View key={index} style={styles.orderServiceRow}>
                        <Text style={styles.serviceQuantity}>x{service.quantity}</Text>
                        <Text style={styles.serviceName}>{service.name}</Text>
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

            <Text style={styles.orderTotal}>Tổng đơn hàng: <Text style={styles.orderPrice}>{order.total}</Text></Text>
            <OrderActions onAccept={() => {}} onCancel={() => {}} />
        </TouchableOpacity>
    );
};

const TabBar = ({ tabs, activeTab, onTabPress }: { tabs: string[]; activeTab: string; onTabPress: (index: number) => void }) => {
    return (
        <View style={styles.stickyHeader}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onTabPress(index)}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default function OrderShop() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<string>>(null);
    const router = useRouter();

    const filteredOrders = useMemo(
        () => orders.filter(order => order.status === activeTab),
        [activeTab]
    );

    const onTabPress = useCallback((index: number) => {
        flatListRef.current?.scrollToOffset({ offset: index * SCREEN_WIDTH, animated: true });
        setActiveTab(tabs[index]);
    }, []);

    const handleOrderDetail = useCallback((orderId: string) => {
        router.push(`/OrderShop/${orderId}`);
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

    const renderOrder = useCallback(({ item }: { item: typeof orders[0] }) => {
        const isExpanded = expandedOrders.has(item.id);
        return (
            <OrderCard
                order={item}
                onPress={() => handleOrderDetail(item.id)}
                onToggleExpand={() => toggleExpand(item.id)}
                isExpanded={isExpanded}
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
                    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                    setActiveTab(tabs[index]);
                }}
                renderItem={() => (
                    <View style={styles.page}>
                        <FlatList
                            data={filteredOrders}
                            keyExtractor={(order) => order.id}
                            renderItem={renderOrder}
                            contentContainerStyle={styles.list}
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
        backgroundColor:"#699BF4"
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
    page: { width: SCREEN_WIDTH, padding: 16 },
    list: { paddingBottom: 16, },
    orderCard: {
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
        marginBottom: 5
    },
    orderCustomer: { fontSize: 16, fontWeight: "medium", color: "#333" },
    orderStatus: { 
        fontSize: 14,
        color: "#ed7c44",
        marginVertical: 4,
        fontWeight: "700", },
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
        alignItems: "center",
        marginBottom: 4,
    },
    serviceQuantity: {
        marginRight: 8,
        fontSize: 14,
        color: "#555",
        fontWeight: "600"
    },
    serviceName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        gap: 20,
        marginTop: 20
    },
    acceptButton: {
        backgroundColor: '#ed7c44',
        padding: 10,
        borderRadius: 5,
        borderColor: "#ed7c44",
        borderWidth: 2, // Độ dày của viền
    },
    cancelButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: "#ed7c44",
        borderWidth: 2, // Độ dày của viền
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        
    },
    buttonTextCancel:{
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
});