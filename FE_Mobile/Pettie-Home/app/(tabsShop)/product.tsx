import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Image,
  Modal,
} from "react-native";

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
    name: "Bình giữ nhiệt Kaiyo 600ml màu xanh mint và màu trắng",
    price: "457.000đ",
    stock: 0,
    status: "2 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "1729456466567203477",
    name: "Bộ thớt gỗ teak NEW M WAY hình chữ nhật có rãnh tay nắm đạt chuẩn châu ...",
    price: "689.000đ",
    stock: 0,
    status: "1 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "1729456466767203277",
    name: "Bộ thớt gỗ teak NEW M WAY hình chữ nhật có rãnh tay nắm đạt chuẩn châu ...",
    price: "689.000đ",
    stock: 0,
    status: "1 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "1729456466787203277",
    name: "Bộ thớt gỗ teak NEW M WAY hình chữ nhật có rãnh tay nắm đạt chuẩn châu ...",
    price: "689.000đ",
    stock: 0,
    status: "1 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "1729456434567203277",
    name: "Bộ thớt gỗ teak NEW M WAY hình chữ nhật có rãnh tay nắm đạt chuẩn châu ...",
    price: "689.000đ",
    stock: 0,
    status: "1 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "1729456466567456277",
    name: "Bộ thớt gỗ teak NEW M WAY hình chữ nhật có rãnh tay nắm đạt chuẩn châu ...",
    price: "689.000đ",
    stock: 0,
    status: "1 SKU đã bán hết",
    imageUrl: "https://via.placeholder.com/50",
  },
];

const tabs = ["Đang hoạt động", "Còn ít tồn kho", "Đang xét duyệt", "Không thành công"];

export default function ProductScreen() {
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
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <Text style={styles.productStock}>Kho: {item.stock}</Text>
          <Text style={styles.productStatus}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Giá/Số lượng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sản phẩm</Text>

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

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

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
  header: {
    fontSize: 25,
    fontWeight: "condensed",
    padding: 17,
    marginLeft: 5,
    marginTop: 40
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
    backgroundColor: "#699BF4", // Màu của tab đang chọn
  },
  tabText: {
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
  },
  menuTrigger: {
    fontSize: 18,
    color: "#699BF4", // Màu của menu trigger
    padding: 5,
    marginLeft: 7,
  },
  list: {
    paddingBottom: 100,
    paddingHorizontal: 16,
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
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    padding: 4,
    fontWeight: "bold",
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
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#699BF4", // Màu của nút hành động
    borderRadius: 4,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#699BF4",
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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