import React, { useState, useEffect } from "react";
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity,
    ScrollView, Dimensions, Image, Modal
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Product {
    id: string;
    name: string;
    price: string;
    stock: number;
    status: string;
    imageUrl?: any;
}

const productsMock: Product[] = [
    {
        id: "1",
        name: "Hạt mèo trưởng thành Zoi Cat",
        price: "232.000đ",
        stock: 10,
        status: "Đang hoạt động",
        imageUrl: require("../../../assets/images/hat-meo-zoi-cat-1kg-thuc-an-cho-meo-truong-thanh-cutepets.webp"),
    },
    {
        id: "2",
        name: "Pate Mèo Snappy Tom 85g",
        price: "12.000đ",
        stock: 0,
        status: "Hết hàng",
        imageUrl: require("../../../assets/images/pate.webp"),
    },
    {
        id: "3",
        name: "Hạt cho mèo SC Mix topping hạt sấy 1.5kg",
        price: "135.000đ",
        stock: 5,
        status: "Đang hoạt động",
        imageUrl: require("../../../assets/images/hatSCMix.webp"),
    },
    {
        id: "4",
        name: "Ổ Nệm Hình Thú Dễ Thương",
        price: "305.000đ",
        stock: 0,
        status: "Đang hoạt động",
        imageUrl: require("../../../assets/images/nemchomeo.jpg"),
    },
];

const tabs = ["Đang hoạt động", "Hết hàng", "Đang xét duyệt", "Không thành công"];

export default function ProductShop() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

    useEffect(() => {
        filterProducts(activeTab);
    }, [activeTab]);

    const filterProducts = (status: string) => {
        const filtered = productsMock.filter(product => product.status === status);
        setFilteredProducts(filtered);
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <View style={styles.productInfo}>
                {item.imageUrl && <Image source={item.imageUrl} style={styles.productImage} />}
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Giá: {item.price}</Text>
                    <Text style={styles.productStock}>Kho: {item.stock}</Text>
                    <Text style={styles.productStatus}>Trạng thái: {item.status}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <AntDesign name="edit" size={15} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Sản phẩm</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.stickyHeader}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
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

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                contentContainerStyle={styles.list}
            />

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
                            <Text style={[styles.modalOptionText, activeTab === tab && styles.activeModalOptionText]}>
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
    container: { flex: 1 },
    headerContainer: { flexDirection: "row", justifyContent: "space-between", padding: 15, paddingTop: 40, backgroundColor: "#fff" },
    header: { fontSize: 22, fontWeight: "bold" },
    addButton: { backgroundColor: "#ed7c44", padding: 10, borderRadius: 8 },
    addButtonText: { color: "#fff", fontWeight: "bold" },
    stickyHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#fff" },
    tabsContainer: { flexDirection: "row" },
    tab: { padding: 10, borderRadius: 20, backgroundColor: "#f0f0f0", marginHorizontal: 5 },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    menuTrigger: { fontSize: 18, color: "#ed7c44", padding: 5 },
    list: { flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    productCard: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginTop: 15,
        
    },
    productInfo: { flexDirection: "row", alignItems: "center", flex: 1,
        padding: 5,
      },
    productImage: { width: 80, height: 80, borderRadius: 10 },
    productDetails: { flex: 1, marginLeft: 15 },
    productName: { fontSize: 16, fontWeight: "medium" },
    productPrice: { color: "#555" },
    productStock: { color: "#777" },
    productStatus: { fontStyle: "italic" },
    actionButton: { backgroundColor: "#ed7c44", padding: 6, borderRadius: 20 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
    modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, position: "absolute", bottom: 0, width: "100%" },
    modalOption: { padding: 15 },
    activeModalOption: { backgroundColor: "#ed7c44" },
    modalOptionText: { textAlign: "center" },
    activeModalOptionText: { color: "#fff" },
});
