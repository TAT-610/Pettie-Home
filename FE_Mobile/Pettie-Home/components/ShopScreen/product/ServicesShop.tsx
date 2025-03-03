import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getServicesByShop } from "@/services/shop/apiService";
import { Profile, Service } from "@/services/types";

const tabs = ["Dịch vụ chó", "Dịch vụ mèo"];

const ServicesShop = ({ shopId, id }: { shopId: string; id: Profile }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchServices = useCallback(async () => {
        console.log("start fetch Service");
    
        try {
            setLoading(true);
            const response = await getServicesByShop();
            console.log("API response:", response);
    
            // Kiểm tra xem API có trả về thành công không
            if (!response.success || !Array.isArray(response.data)) {
                throw new Error("Dữ liệu trả về không hợp lệ hoặc không phải danh sách");
            }
    
            // Lấy dữ liệu từ response.data
            const servicesData = response.data;
            console.log("Services Data:", servicesData);
    
            // Định dạng dữ liệu
            const formattedServices = servicesData.map((service: Service) => ({
                id: service.id,
                name: service.name,
                price: service.price,
                description: service.description,
                status: "Dịch vụ chó", // Cập nhật dựa trên thực tế
                imageUrl: service.imageUrl || service.imageFileName, // Ưu tiên ảnh từ imageUrl trước
            }));
    
            setServices(formattedServices);
            console.log("Formatted Services:", formattedServices);
        } catch (error : any) {
            console.error("Lỗi khi tải danh sách dịch vụ:", error);
            Alert.alert("Lỗi", error.message || "Không thể tải danh sách dịch vụ.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, []);

    const filteredServices = useMemo(() =>
        services.filter(service => service.status === activeTab),
        [services, activeTab]);

    const handleAddService = useCallback(() => {
        router.push(`/ServiceShop/addservice`);
    }, [router]);

    const handleEditService = useCallback((id: string) => {
        router.push(`/ServiceShop/Edit/[editservice]?id=${id}`);
    }, [router]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dịch vụ</Text>
            <View style={styles.tabContainer}>
                <View style={{ flexDirection: "row" }}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
                    <Ionicons name="add-circle" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#699BF4" style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={filteredServices}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: item.imageUrl ? `https://pettiehome.online/web/${item.imageUrl}` : 'default-image-url.jpg' }}
                                    style={styles.image}
                                />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>Giá: {item.price}.000đ</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleEditService(item.id)}
                                >
                                    <AntDesign name="edit" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e9f1ff" },
    header: {
        fontSize: 20, fontWeight: "800", paddingVertical: 15,
        textAlign: "center", backgroundColor: "#699BF4", paddingTop: 50,
        color: "#fff"
    },
    tabContainer: { flexDirection: "row", backgroundColor: "#699BF4", paddingBottom: 9, justifyContent: "space-between", padding: 10 },
    tab: { padding: 10, borderRadius: 20, backgroundColor: "#fff", marginHorizontal: 5 },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { color: "#555" },
    activeTabText: { color: "#fff" },
    addButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        flex: 1, marginLeft: 15,
        marginBottom: 27
    },
    name: { fontSize: 16, fontWeight: "medium", marginBottom: 5 },
    price: { fontSize: 13, color: "#ed7c44", marginBottom: 10 },
    description: { fontSize: 12, color: "#666" },
    actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20 },
});

export default ServicesShop;