import React, { useState, useEffect } from "react";
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity,
    ScrollView, Dimensions, Image, Modal
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface Product {
    id: string;
    name: string;
    price: string;
    quantity: number;
    status: string;
    image: string;
}

const productsMock: Product[] = [
    {
        id: "1",
        name: "Cát đậu nành Cature cho mèo 2.8kg",
        price: "232.000đ",
        quantity: 10,
        status: "Đang hoạt động",
        image: "https://paddy.vn/cdn/shop/files/Thi_tk_ch_acoten_2.png?v=1690719510",
    },
    {
        id: "2",
        name: "Pate mèo kucinta gói 80g",
        price: "12.000đ",
        quantity: 0,
        status: "Hết hàng",
        image: "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
    },
    {
        id: "3",
        name: "Bánh quy cho chó",
        price: "135.000đ",
        quantity: 5,
        status: "Đang hoạt động",
        image: "https://paddy.vn/cdn/shop/files/snack-cho-cho-banh-quy-doggyman_5.jpg?v=1732863422",
    },
    {
        id: "4",
        name: "Cây cào móng chó mèo",
        price: "305.000đ",
        quantity: 0,
        status: "Đang hoạt động",
        image: "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
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
                {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Giá: {item.price}</Text>
                    <Text style={styles.productStock}>Kho: {item.quantity}</Text>
                    <Text style={styles.productStatus}>Trạng thái: {item.status}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <AntDesign name="edit" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Sản phẩm</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text><Ionicons name="add-circle" size={35} color="#fff" /></Text>
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
                    <Text style={styles.menuTrigger}><AntDesign name="filter" size={24} color="#fff" /></Text>
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
    container: { flex: 1, backgroundColor: "#f0f0f0",  },
    headerContainer: { flexDirection: "row", justifyContent: "space-between", padding: 15, paddingTop: 40, backgroundColor: "#699BF4" },
    header: { fontSize: 22, fontWeight: "bold", padding: 12, color:"#fff"},
    addButton: {  padding: 4},
    stickyHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#699BF4", marginBottom: 20 },
    tabsContainer: { flexDirection: "row" },
    tab: { padding: 10, borderRadius: 20, backgroundColor: "#fff", marginHorizontal: 5 },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    menuTrigger: {  padding: 5 },
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
        backgroundColor: "#fff",
        
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
