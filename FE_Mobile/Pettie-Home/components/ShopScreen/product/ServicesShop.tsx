import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { getServicesByShop } from "@/services/shop/apiService";
import { Service } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tabs = ["Mèo", "Chó"]; // Cập nhật lại tabs để khớp với dữ liệu API

const ServicesShop = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [shopId, setShopId] = useState<string | null>(null);

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

    useFocusEffect(
            useCallback(() => {
        if (!shopId) return;

                const fetchServices = async () => {
                    try {
                        setLoading(true); // Bắt đầu loading
                        const serviceData = await getServicesByShop(shopId, 1, 100);
                        const formattedServices = serviceData.map((service: any) => ({
                            id: service.id,
                            name: service.name,
                            price: service.price,
                            status: "Mèo",
                            imageUrl: service.imageUrl || service.imageFileName,
                        }));
                        setServices(formattedServices);
                        console.log("data service:", formattedServices);
                    } catch (error) {
                        console.error("Lỗi khi lấy dich vu:", error);
                    } finally {
                        setLoading(false)
                    }
                };
    
                fetchServices();
            }, [shopId])
        );

    const filteredServices = useMemo(() =>
        Array.isArray(services) ? services.filter(service => service.status === activeTab) : [],
        [services, activeTab]
    );

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
                                    source={{ uri: item.imageUrl ? `https://pettiehome.online/web/${item.imageUrl}` : 'https://via.placeholder.com/80' }}
                                    style={styles.image}
                                />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>Giá: {item.price}.000đ</Text>
                                    <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleEditService(item.id)}
                                >
                                    <AntDesign name="edit" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={() => (
                            <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
                                Không có dịch vụ nào được tìm thấy.
                            </Text>
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