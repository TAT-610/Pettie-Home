import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, StyleSheet, FlatList, TouchableOpacity, 
    Animated, ScrollView, Dimensions, Image, Modal 
} from "react-native";
import { getAllProducts, getAllProductsByShop, getAllShops } from "@/services/api";
import { AntDesign } from "@expo/vector-icons";
import { Products } from "@/services/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const tabs = ["Đang hoạt động", "Hết hàng", "Đang xét duyệt", "Không thành công"];

export default function ProductShop({ shopId }: { shopId: string }) { 
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<string>>(null);
    const [products, setProducts] = useState<Products[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]); // Sản phẩm đã lọc theo trạng thái

    useEffect(() => {
        console.log("Goi api getAllShop");
        const fetchAllShops = async () => {
          try {
            const shopsData = await getAllShops();
            console.log("ShopData", shopsData);  // Check the data received
          } catch (error) {
            console.error("Error fetching shops:", error);
          }
        };
        fetchAllShops();
      }, []);

      useEffect(() => {
        console.log("Goi api getAllProduct");
        const fetchAllProducts= async () => {
          try {
            const productsData = await getAllProducts();
            console.log("productsData: ", productsData);  // Check the data received
            setProducts(productsData); // Lưu dữ liệu sản phẩm vào state
            filterProducts(productsData, activeTab); // Lọc sản phẩm theo tab hiện tại
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
        fetchAllProducts();
      }, []);
    

    // Lọc sản phẩm theo trạng thái
    const filterProducts = (products: Products[], status: string) => {
        const filtered = products.filter(product => product.status === status);
        setFilteredProducts(filtered);
    };

    const onTabPress = (index: number) => {
        const selectedTab = tabs[index];
        setActiveTab(selectedTab);  // Cập nhật tab đang chọn
        filterProducts(products, selectedTab);  // Lọc sản phẩm theo trạng thái của tab
    };

    const renderProduct = ({ item }: { item: Products }) => (
        <View style={styles.productCard}>
            <View style={styles.productInfo}>
                <Image source={{ uri: item.image || 'https://example.com/default-avatar.png' }} style={styles.productImage} />
                
                <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.productPrice} numberOfLines={1}>Giá: {item.price}</Text>
                    <Text style={styles.productStock} numberOfLines={1}>Kho: {item.quantity}</Text>
                    <Text style={styles.productStatus} numberOfLines={1}>Trạng thái: {item.status}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <AntDesign name="edit" size={15} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.addPr}>
                <Text style={styles.header}>Sản phẩm</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                </TouchableOpacity>
            </View>

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

            <FlatList
                data={filteredProducts}  // Hiển thị sản phẩm đã lọc theo trạng thái
                keyExtractor={(product) => product.id}
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
                                filterProducts(products, tab); // Lọc lại sản phẩm khi chọn tab
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
    container: { flex: 1, backgroundColor: "#f9f9f9" },
    addPr: { flexDirection: "row", justifyContent: "space-between", marginTop: 40, marginLeft: 10, marginBottom: 30 },
    header: { fontSize: 25, fontWeight: "800", padding: 5, marginRight: 15 },
    addButton: { backgroundColor: "#ed7c44", padding: 10, borderRadius: 8, marginRight: 15 },
    addButtonText: { textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" },
    stickyHeader: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd", zIndex: 10, paddingVertical: 8, paddingHorizontal: 16 },
    tabsContainer: { flexDirection: "row" },
    tab: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 16, backgroundColor: "#f0f0f0" },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    menuTrigger: { fontSize: 18, color: "#ed7c44", padding: 5, marginLeft: 7 },
    list: { paddingBottom: 100, paddingHorizontal: 13, marginTop: 20 },
    productCard: { flexDirection: "row", backgroundColor: "#fff", padding: 8, marginVertical: 8, borderRadius: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
    productInfo: { flexDirection: "row", marginBottom: 8, marginTop: 10 },
    productImage: { width: 100, height: 100, borderRadius: 10 },
    productDetails: { flex: 1, marginLeft: 15 },
    productName: { fontSize: 15, fontWeight: "600", marginBottom: 7 },
    productPrice: { fontSize: 14, fontWeight: "medium", marginBottom: 7, marginTop: 7 },
    productStock: { fontSize: 12, marginBottom: 6, },
    productStatus: { fontSize: 12, color: "#ff0000" },
    actionButton: { padding: 7, backgroundColor: "#ed7c44", borderRadius: 4, marginTop: 60, paddingTop: 12 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContainer: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    modalOption: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#ddd", backgroundColor: "#fff" },
    modalOptionText: { fontSize: 16, color: "#555" },
    activeModalOption: { backgroundColor: "#699BF4" },
    activeModalOptionText: { color: "#fff", fontWeight: "bold" },
});
