import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { getProductsByShop, deleteProduct } from "@/services/shop/apiproduct";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

interface Product {
    id: string;
    name: string;
    price: string;
    quantity: number;
    status: string;
    imageUrl: string;
}

const tabs = ["Đang hoạt động", "Hết hàng", "Đang xét duyệt", "Không thành công"];

export default function ProductShop({ shopId }: { shopId: string }) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [products, setProducts] = useState<Product[]>([]);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
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
                } catch (error) {
                    console.error("Lỗi khi lấy sản phẩm:", error);
                }
            };

            fetchProducts();
        }, [])
    );

    const filteredProducts = useMemo(
        () => products.filter((product) => product.status === activeTab),
        [products, activeTab]
    );

    const handleAddProduct = useCallback(() => {
        router.push(`/ProductShop/addproduct`);
    }, [router]);

    const handleEditProduct = useCallback((id: string) => {
        router.push(`/ProductShop/[editproduct]?id=${id}`);
    }, [router]);

    const confirmDeleteProduct = (id: string) => {
        setDeleteProductId(id);
    };

    const handleDeleteProduct = async () => {
        if (deleteProductId) {
            try {
                await deleteProduct(deleteProductId);
                setProducts(products.filter((product) => product.id !== deleteProductId));
                setDeleteProductId(null);
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
            }
        }
    };

    const renderRightActions = (id: string) => (
        <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteProduct(id)}>
                <AntDesign name="delete" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Sản phẩm</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                        <Ionicons name="add-circle" size={35} color="#fff" />
                    </TouchableOpacity>
                </View>

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

                <FlatList
                    style={{ padding: 5 }}
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: item.imageUrl ? `https://pettiehome.online/web/${item.imageUrl}` : 'default-image-url.jpg' }}
                                    style={styles.image}
                                />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>Giá: {item.price}đ</Text>
                                </View>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleEditProduct(item.id)}>
                                    <AntDesign name="edit" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Swipeable>
                    )}
                />

                <Modal
                    visible={!!deleteProductId}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setDeleteProductId(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>
                                Bạn có chắc muốn xóa sản phẩm này?
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => setDeleteProductId(null)} style={styles.cancelButton}>
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDeleteProduct} style={styles.deleteButton}>
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e9f1ff", paddingBottom: 20 },
    headerContainer: { flexDirection: "row", justifyContent: "space-between", padding: 15, paddingTop: 40, backgroundColor: "#699BF4" },
    header: { fontSize: 22, fontWeight: "bold", padding: 12, color: "#fff" },
    addButton: { padding: 4 },
    tabsContainer: { flexDirection: "row", padding: 10, backgroundColor: "#699BF4", marginBottom: 10 },
    tab: { padding: 10, borderRadius: 20, backgroundColor: "#fff", marginHorizontal: 5 },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    card: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: "#ddd", backgroundColor: "white" },
    image: { width: 80, height: 80, borderRadius: 10 },
    details: { flex: 1, marginLeft: 15 },
    name: { fontSize: 16, fontWeight: "500", marginBottom: 5 },
    price: { fontSize: 13, color: "#ed7c44" },
    actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20 },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm mờ nền
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        width: "80%", // Độ rộng modal
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      cancelButton: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ccc",
        borderRadius: 5,
        alignItems: "center",
        marginRight: 10,
      },
      deleteButton: {
        flex: 1,
        backgroundColor: "red",
        borderRadius: 5,
        alignItems: "center",
        paddingTop: 40,
        width: 60, // Tăng kích thước chiều rộng
        height: 60,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      deleteContainer: {
        alignItems: "center",
        justifyContent: "center",
      },
});

