import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Profile } from "@/services/types";
import { useFocusEffect, useRouter } from "expo-router";
import { getProductsByShop } from "@/services/shop/apiproduct";

interface Product {
    id: string;
    name: string;
    price: string;
    quantity: number;
    status: string;
    imageUrl: string;
}

const tabs = ["Đang hoạt động", "Hết hàng", "Đang xét duyệt", "Không thành công"];

export default function ProductShop({ shopId, id }: { shopId: string; id: Profile }) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const fetchProducts = async () => {
                try {
                    const productData = await getProductsByShop(1, 100);
                    const formattedProducts = productData.map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        status: "Đang hoạt động",
                        imageUrl: product.imageUrl || product.imageFileName,
                    }));
                    setProducts(formattedProducts);
                    console.log("data product:", formattedProducts);
                } catch (error) {
                    console.error("Lỗi khi lấy sản phẩm:", error);
                }
            };

            fetchProducts();
        }, [])
    );


    const filteredProducts = useMemo(() =>
        products.filter(product => product.status === activeTab),
        [products, activeTab]);

    const handleAddProduct = useCallback(() => {
        router.push(`/ProductShop/addproduct`);
    }, [router]);

    const handleEditProduct = useCallback((id: string) => {
        router.push(`/ProductShop/[editproduct]?id=${id}`);
    }, [router]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Sản phẩm</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                    <Ionicons name="add-circle" size={35} color="#fff" />
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
                    <AntDesign name="filter" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ padding: 5 }}
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.imageUrl ? `https://pettiehome.online/web/${item.imageUrl}` : 'default-image-url.jpg' }}
                            style={styles.image}
                        />

                        <View style={styles.details}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>Giá: {item.price}đ</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleEditProduct(item.id)}
                        >
                            <AntDesign name="edit" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
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
    container: { flex: 1, backgroundColor: "#e9f1ff", paddingBottom: 20, },
    headerContainer: { flexDirection: "row", justifyContent: "space-between", padding: 15, paddingTop: 40, backgroundColor: "#699BF4" },
    header: { fontSize: 22, fontWeight: "bold", padding: 12, color: "#fff" },
    addButton: { padding: 4 },
    stickyHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#699BF4", marginBottom: 10 },
    tabsContainer: { flexDirection: "row" },
    tab: { padding: 10, borderRadius: 20, backgroundColor: "#fff", marginHorizontal: 5 },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    card: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: "#ddd", backgroundColor: "white" },
    image: { width: 80, height: 80, borderRadius: 10, resizeMode: "cover" }, // hoặc "contain" tùy vào yêu cầu ,
    details: { flex: 1, marginLeft: 15, marginBottom: 35 },
    name: { fontSize: 16, fontWeight: "500", marginBottom: 5 },
    price: { fontSize: 13, color: "#ed7c44" },
    actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
    modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, position: "absolute", bottom: 0, width: "100%" },
    modalOption: { padding: 15 },
    activeModalOption: { backgroundColor: "#ed7c44" },
    modalOptionText: { textAlign: "center" },
    activeModalOptionText: { color: "#fff" },
});
