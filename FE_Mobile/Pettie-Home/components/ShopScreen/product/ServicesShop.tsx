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
    { id: 3, name: "Tắm cho mèo", image: "https://i.pinimg.com/736x/e1/7e/69/e17e69221a1a707186aef0f086711cd0.jpg", price: 120, type: "Dịch vụ mèo" },
    { id: 4, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/04/6c/a0/046ca0dc65a40a0bd9977c45eadea23a.jpg", price: 200, type: "Dịch vụ chó" },
    { id: 5, name: "Cắt tỉa lông mèo", image: "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg", price: 180, type: "Dịch vụ mèo" },
    { id: 6, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/ff/18/b7/ff18b74815587fc62b8598a8d578e434.jpg", price: 200, type: "Dịch vụ chó" },
    { id: 7, name: "Cắt tỉa lông chó", image: "https://peticon.edu.vn/wp-content/uploads/2023/05/cao-long-cho.jpeg", price: 200, type: "Dịch vụ chó" },
    { id: 8, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/02/3e/4a/023e4a4f882cc136fa10b91cea69ae32.jpg", price: 200, type: "Dịch vụ chó" },
    { id: 9, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/08/c1/16/08c116f72aaef1ba5f383cd2ad351046.jpg", price: 200, type: "Dịch vụ mèo" },
    { id: 10, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/ca/31/26/ca3126a64fa64144a0bcad082d907d33.jpg", price: 200, type: "Dịch vụ chó" },
    { id: 11, name: "Cắt tỉa lông chó", image: "https://i.pinimg.com/736x/31/24/29/312429037fa87a4e035002e82a1b966d.jpg", price: 200, type: "Dịch vụ mèo" },

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
                                <AntDesign name="edit" size={20} color="white" />
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
    header: { fontSize: 20, fontWeight: "800", paddingVertical: 15,
         textAlign: "center",backgroundColor: "#699BF4", paddingTop: 50,
        color: "#fff" },

    tabContainer: {
        flexDirection: "row", justifyContent: "space-around", backgroundColor: "#699BF4",
        paddingBottom: 20
    },
    tab: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: "#fff" },
    activeTab: { backgroundColor: "#ed7c44" },
    tabText: { fontSize: 16, color: "#000" },
    activeTabText: { color: "#fff", fontWeight: "bold" },

    listContainer: { paddingHorizontal: 5,
        paddingTop: 15,
        marginBottom: 10, },
    card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "white"
    },
    image: { width: 80, height: 80, borderRadius: 10 },
    details: { flex: 1, marginLeft: 15,
        marginBottom: 27
     },
    name: { fontSize: 16, fontWeight: "medium", marginBottom: 5 },
    price: { fontSize: 13, color: "#ed7c44", marginBottom: 10 },

    actionButton: { padding: 6, backgroundColor: "#ed7c44", borderRadius: 20, },

});

export default ServicesShop;
