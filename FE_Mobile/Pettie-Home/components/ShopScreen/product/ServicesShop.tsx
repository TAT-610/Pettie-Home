import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const tabs = ["Dịch vụ chó", "Dịch vụ mèo"];

const initialServices = [
    { id: 1, name: "Tắm cơ bản cho chó < 4kg", image: "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg", price: 100, type: "Dịch vụ chó" },
    { id: 2, name: "Tắm cơ bản cho chó 4-8kg", image: "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg", price: 150, type: "Dịch vụ chó" },
    { id: 3, name: "Tắm cho mèo", image: "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg", price: 120, type: "Dịch vụ mèo" },
    { id: 4, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg", price: 200, type: "Dịch vụ chó" },
    { id: 5, name: "Cắt tỉa lông mèo", image: "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg", price: 180, type: "Dịch vụ mèo" },
];

const ServicesShop = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const filteredServices = initialServices.filter(service => service.type === activeTab);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dịch vụ</Text>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Danh sách dịch vụ */}
            <View style={styles.listContainer}>
                <FlatList
                    data={filteredServices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>Giá: {item.price}.000đ</Text>
                            </View>
                            <TouchableOpacity style={styles.actionButton}>
                                <AntDesign name="edit" size={15} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f0f0" },
    header: { fontSize: 20, fontWeight: "800", paddingVertical: 15, textAlign: "center",backgroundColor: "#fff", paddingTop: 40 },

    tabContainer: {
        flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff",
        paddingBottom: 20
    },
    tab: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: "#ddd" },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { fontSize: 16, color: "#000" },
    activeTabText: { color: "#fff", fontWeight: "bold" },

    listContainer: { flex: 1, backgroundColor: "#fff", marginTop: 15, padding: 5 },
    card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: { width: 80, height: 80, borderRadius: 10 },
    details: { flex: 1, marginLeft: 15 },
    name: { fontSize: 16, fontWeight: "medium", marginBottom: 5 },
    price: { fontSize: 13, color: "#888", marginBottom: 10 },

    actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20, marginTop: 60 },

});

export default ServicesShop;
