import { useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import { Animated, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const orders = [
    {
        id: "1",
        customerName: "Trần Thị Thanh Thảo",
        time: "15:00 - 20/10/2024",
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
        time: "10:00 - 21/10/2024",
        services: [
            { name: "Tắm và vệ sinh (Chó/Mèo) 3kg-10kg", quantity: 2 },
        ],
        total: "935.000 VNĐ",
        status: "Chờ xác nhận",
    },
];

const tabs = ["Chờ xác nhận", "Chờ ngày hẹn", "Đang diễn ra", "Đã hoàn thành", "Đã hủy"];

export default function OrderShop() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<string>>(null);
    const router = useRouter();
    const filteredOrders = orders.filter(service => service.status === activeTab);

    const onTabPress = (index: number) => {
        flatListRef.current?.scrollToOffset({ offset: index * SCREEN_WIDTH, animated: true });
        setActiveTab(tabs[index]);
    };

    const handleOrderDetail = (orderId: string) => {
        router.push(`/ProductShop/${orderId}`);
    };
    

    const toggleExpand = (orderId: string) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };

    const renderOrder = ({ item }: { item: typeof orders[0] }) => {
        const isExpanded = expandedOrders.has(item.id);
        const visibleServices = isExpanded ? item.services : item.services.slice(0, 2);
        const shouldShowToggle = item.services.length > 2;

        return (
            <TouchableOpacity style={styles.orderCard} onPress={() => handleOrderDetail(item.id)}>
                <View style={styles.buttonorder}>
                    <Text style={styles.orderCustomer}>{item.customerName}</Text>
                    <Text style={styles.orderTime}>{item.time}</Text>
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
                            toggleExpand(item.id)
                        }}
                        style={styles.expandButton}
                    >
                        <Text style={styles.expandButtonText}>
                            {isExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                        </Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.orderTotal}>Tổng đơn hàng: <Text style={styles.orderPrice}>{item.total}</Text></Text>

                <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Nhận đơn</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Quản lí đơn hàng</Text>
            </View>

            {/* Tabs */}
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
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Text style={styles.menuTrigger}>☰</Text>
                </TouchableOpacity>
            </View>

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

            {/* Modal */}
            <Modal
                visible={isMenuVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)} />
                <View style={styles.modalContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => {
                                setActiveTab(tab);
                                setMenuVisible(false);
                            }}
                            style={[styles.modalOption, activeTab === tab && styles.activeModalOption]}
                        >
                            <Text
                                style={[styles.modalOptionText, activeTab === tab && styles.activeModalOptionText]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f9f9f9" },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 30,
    },
    header: { fontSize: 24, fontWeight: "bold", color: "#333" },
    stickyHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        zIndex: 10,
    },
    tabsContainer: {
        flexDirection: "row",
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
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
        fontSize: 18,
        color: "#ed7c44",
        padding: 5,
        marginLeft: 7,
    },
    page: { width: SCREEN_WIDTH, padding: 16 },
    list: { paddingBottom: 100, },
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
    orderCustomer: { fontSize: 16, fontWeight: "bold", color: "#333" },
    orderTime: { fontSize: 14, color: "#555", marginVertical: 4 },
    orderServices: { marginTop: 8 , marginBottom: 5},
    orderTotal: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 10,
    },
    orderPrice: {
        color: '#DC143C',
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
        backgroundColor: "#699BF4",
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
    acceptButton: {
        marginTop: 16,
        backgroundColor: "#ed7c44",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
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