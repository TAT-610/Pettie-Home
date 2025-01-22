import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, ScrollView, Dimensions, Image, Modal, } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Product {
    id: string;
    name: string;
    price: string;
    stock: number;
    status: string;
    imageUrl?: string;
}

const products: Product[] = [
    {
        id: "1730168662752790989",
        name: "Hạt mèo trưởng thành Zoi Cat",
        price: "232.000đ",
        stock: 0,
        status: "2",
        imageUrl: require("../../assets/images/hat-meo-zoi-cat-1kg-thuc-an-cho-meo-truong-thanh-cutepets.webp"),
    },
    {
        id: "1729456466567203477",
        name: "Pate Mèo Snappy Tom 85g",
        price: "12.000đ",
        stock: 0,
        status: "đã bán hết",
        imageUrl: require("../../assets/images/pate.webp"),
    },
    {
        id: "1729456466767203277",
        name: "Hạt cho mèo SC Mix topping hạt sấy 1.5kg",
        price: "135.000đ",
        stock: 0,
        status: "1 ",
        imageUrl: require("../../assets/images/hatSCMix.webp"),
    },
    {
        id: "1729456466787203277",
        name: "Ổ Nệm Hình Thú Dễ Thương Cho Mèo Chất Liệu Mềm Mại",
        price: "305.000đ",
        stock: 0,
        status: "đã bán hết",
        imageUrl: require("../../assets/images/nemchomeo.jpg"),
    },
    {
        id: "1729456434567203277",
        name: "Nhà vệ sinh cho mèo chống văng cát, chậu cát, gấp gọn tiện lợi",
        price: "689.000đ",
        stock: 0,
        status: "đã bán hết",
        imageUrl: require("../../assets/images/hopcat.png"),
    },
    {
        id: "1729456466567456277",
        name: "Đồ Chơi Mèo Cattyman Thú Bông Lưới Gặm Sạch Răng",
        price: "5050.000đ",
        stock: 0,
        status: "1 ",
        imageUrl: require("../../assets/images/bancaomong.webp"),
    },
];

const tabs = ["Đang hoạt động", "Còn ít tồn kho", "Đang xét duyệt", "Không thành công"];

export default function ProductShop() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<string>>(null);

    const onTabPress = (index: number) => {
        flatListRef.current?.scrollToOffset({ offset: index * SCREEN_WIDTH, animated: true });
        setActiveTab(tabs[index]);
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <View style={styles.productInfo}>
                {item.imageUrl && (
                    <Image 
                    source={typeof item.imageUrl === "string" ? { uri: item.imageUrl } : item.imageUrl} 
                    style={styles.productImage} 
                />
                )}
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Giá: {item.price}</Text>
                    <Text style={styles.productStock}>Kho: {item.stock}</Text>
                    <Text style={styles.productStatus}>Số lượng: {item.status}</Text>
                </View>
                <View style={styles.productActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.addPr}>
                <Text style={styles.header}>Sản phẩm</Text>

                {/* Add Product Button */}
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                </TouchableOpacity>
            </View>


            {/* Sticky Header */}
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
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Text style={styles.menuTrigger}>☰</Text>
                </TouchableOpacity>
            </View>

            {/* Product List with Animation */}
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
                renderItem={({ item }) => (
                    <View style={styles.page}>
                        <FlatList
                            data={products}
                            keyExtractor={(product) => product.id}
                            renderItem={renderProduct}
                            contentContainerStyle={styles.list}
                        />
                    </View>
                )}
            />

            {/* Menu Modal */}
            <Modal
                visible={isMenuVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                />
                <View style={styles.modalContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => {
                                setActiveTab(tab);
                                setMenuVisible(false);
                            }}
                            style={[
                                styles.modalOption,
                                activeTab === tab && styles.activeModalOption,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalOptionText,
                                    activeTab === tab && styles.activeModalOptionText,
                                ]}
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
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    page: {
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
    pageText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addPr: {    
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 30,
    },
    header: {
        fontSize: 25,
        fontWeight: "condensed",
        padding: 5,
        marginRight: 15,
    },
    addButton: {
        backgroundColor: "#ed7c44",
        padding: 10,
        borderRadius: 8,
        marginRight: 15,
    },
    addButtonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    
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
        backgroundColor: "#ed7c44", // Màu của tab đang chọn
    },
    tabText: {
        color: "#555",
    },
    activeTabText: {
        color: "#fff",
    },
    menuTrigger: {
        fontSize: 18,
        color: "#ed7c44", // Màu của menu trigger
        padding: 5,
        marginLeft: 7,
    },
    list: {
        paddingBottom: 100,
        paddingHorizontal: 13,
        marginTop: 20
    },
    productCard: {
        flexDirection: "row",
        backgroundColor: "#fff", // Màu của tab đang chọn
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center", // Căn giữa các phần tử theo chiều dọc
        height: 150, // Đặt chiều cao cố định để tạo hình chữ nhật nằm ngang
    },
    productInfo: {
        flexDirection: "row",
        marginBottom: 8,
        marginTop: 10
    },
    productImage: {
        maxWidth: '100%',
        width: 110,
        height: 120,
        marginRight: 16,
        marginTop: 8,
        borderRadius: 10
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        padding: 4,
        fontWeight: "bold",
        color: 'green'
    },
    productStock: {
        fontSize: 12,
        marginBottom: 6,
        color: "#888",
    },
    productStatus: {
        fontSize: 12,
        color: "#ff0000",
    },
    productActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: 'flex-end'
    },
    actionButton: {
        padding: 8,
        backgroundColor: "#ed7c44", // Màu của nút hành động
        borderRadius: 4,
    },
    actionText: {
        color: "#fff",
        fontSize: 12,
    },
   
    modalOverlay: {
        flex: 1,
        backgroundColor: "#D3D3D3", // Màu của overlay modal
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
        backgroundColor: "#699BF4", // Màu nền cho tab đang hoạt động
    },
    activeModalOptionText: {
        color: "#fff", // Màu chữ cho tab đang hoạt động
        fontWeight: "bold",
    },
});