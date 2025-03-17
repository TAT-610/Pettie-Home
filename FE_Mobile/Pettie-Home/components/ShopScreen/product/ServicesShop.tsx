import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { deleteService, getServicesByShop } from "@/services/shop/apiService";
import { Category, Service } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllCategories } from "@/services/shop/apiService";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

const ServicesShop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [shopId, setShopId] = useState<string | null>(null);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);


  useEffect(() => {
    const fetchShopId = async () => {
      const id = await AsyncStorage.getItem("shopId");
      if (id) {
        setShopId(id);
      } else {
        console.error("❌ Không tìm thấy shopId trong AsyncStorage");
      }
    };
    fetchShopId();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData);
        if (categoryData.length > 0) {
          setActiveTab(categoryData[0].name);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!shopId) return;
  
      const fetchServices = async () => {
        try {
          setLoading(true); // Bắt đầu loading
          const serviceData = await getServicesByShop(shopId, 1, 100);
  
          if (Array.isArray(serviceData)) {
            const formattedServices = serviceData
              .filter((service: any) => service.category.name === activeTab)
              .map((service: any) => ({
                id: service.id,
                name: service.name,
                price: service.price,
                category: service.category.name,
                imageUrl: service.imageUrl || service.imageFileName,
                image: service.imageUrl || service.imageFileName,
              }));
            setServices(formattedServices);
            console.log("data service:", formattedServices);
          } else {
            console.error("serviceData không phải là một mảng");
            setServices([]);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dịch vụ:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchServices();
    }, [shopId, activeTab])
  );

  const filteredServices = useMemo(
    () => services.filter((service) => service.category === activeTab),
    [services, activeTab]
  );

  const handleAddService = useCallback(() => {
    router.push(`/ServiceShop/addservice`);
  }, [router]);

  const handleEditService = useCallback(
    (id: string) => {
      router.push(`/ServiceShop/Edit/[editservice]?id=${id}`);
    },
    [router]
  );

  const confirmDeleteService = (id: string) => {
    setDeleteServiceId(id);
  };

  const handleDeleteService = async () => {
    if (deleteServiceId) {
      try {
        await deleteService(deleteServiceId);
        setServices(services.filter((service) => service.id !== deleteServiceId));
        setDeleteServiceId(null);
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const renderRightActions = (id: string) => (
    <View style={styles.deleteContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteService(id)}>
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Dịch vụ</Text>
        <View style={styles.tabContainer}>
          <View style={{ flexDirection: "row" }}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, activeTab === category.name && styles.activeTab]}
                onPress={() => setActiveTab(category.name)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === category.name && styles.activeTabText,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
            <Ionicons name="add-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#699BF4"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item.id.toString()}
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
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleEditService(item.id)}>
                      <AntDesign name="edit" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              )}
              ListEmptyComponent={() => (
                <Text
                  style={{ textAlign: "center", marginTop: 20, color: "#999" }}
                >
                  Không có dịch vụ nào được tìm thấy.
                </Text>
              )}
            />
          </View>
        )}
        <Modal
          visible={!!deleteServiceId}
          transparent
          animationType="fade"
          onRequestClose={() => setDeleteServiceId(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Bạn có chắc muốn xóa sản phẩm này?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setDeleteServiceId(null)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteService} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f1ff" },
  header: {
    fontSize: 20,
    fontWeight: "800",
    paddingVertical: 15,
    textAlign: "center",
    backgroundColor: "#699BF4",
    paddingTop: 50,
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#699BF4",
    paddingBottom: 9,
    justifyContent: "space-between",
    padding: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  activeTab: { backgroundColor: "#ed7c44" },
  tabText: { color: "#555" },
  activeTabText: { color: "#fff" },
  addButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    paddingHorizontal: 5,
    paddingTop: 15,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  details: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 27,
  },
  name: { fontSize: 16, fontWeight: "medium", marginBottom: 5 },
  price: { fontSize: 13, color: "#ed7c44", marginBottom: 10 },
  description: { fontSize: 12, color: "#666" },
  actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20 },
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
});

export default ServicesShop;
