import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createServices } from "@/services/shop/apiService";

export default function AddService() {
    const router = useRouter();

    const [service, setService] = useState<{
        name: string;
        price: string;
        image: { uri: string; type: string; fileName: string } | null;
        description: string;
    }>({
        name: "",
        price: "",
        image: null,
        description: "",
    });

    const handleChange = (field: keyof typeof service, value: string) => {
        setService((prev) => ({
            ...prev,
            [field]: field === "price" ? value.replace(/[^0-9]/g, "") : value, // Chỉ cho phép nhập số vào price
        }));
    };

    // Chọn ảnh từ thư viện
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Lỗi", "Bạn cần cấp quyền để chọn ảnh!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setService((prev) => ({
                ...prev,
                image: {
                    uri: result.assets[0].uri,
                    type: "image/jpeg",
                    fileName: result.assets[0].fileName || "upload.jpg",
                },
            }));
        }
    };

    const handleAddService = async () => {
        if (!service.name) {
            Alert.alert("Lỗi", "Vui lòng nhập tên dịch vụ");
            return;
        }

        try {
            let formData = new FormData();
            formData.append("name", service.name);
            formData.append("price", service.price);
            formData.append("description", service.description);

            if (service.image) {
                formData.append("image", {
                    uri: service.image.uri,
                    name: service.image.fileName,
                    type: service.image.type,
                } as any);
            }
            await createServices(service);
            Alert.alert("Thành công", "Dịch vụ đã được thêm!");
            router.back();
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm dịch vụ, vui lòng thử lại!");
            console.error("Lỗi khi thêm dịch vụ:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.header}>Thêm dịch vụ</Text>
            </View>
            <View style={styles.card}>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {service.image ? (
                        <Image source={{ uri: service.image.uri }} style={styles.imagePreview} />
                    ) : (
                        <Text>Chọn ảnh</Text>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tên dịch vụ"
                    value={service.name}
                    onChangeText={(text) => handleChange("name", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Giá dịch vụ VND"
                    keyboardType="numeric"
                    value={service.price}
                    onChangeText={(text) => handleChange("price", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Chi tiết dịch vụ"
                    value={service.description}
                    onChangeText={(text) => handleChange("description", text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
                    <Text style={styles.buttonText}>Thêm dịch vụ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#699BF4",
        padding: 10,
        paddingBottom: 30,
        paddingTop: 30
    },
    backButton: { marginRight: 10 },
    header: { fontSize: 22, fontWeight: "bold", color: "#fff" },
    card: { backgroundColor: "#fff", padding: 20, marginBottom: 20, margin: 5 },
    imagePreview: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: "#fff" },
    addButton: { backgroundColor: "#ed7c44", padding: 15, borderRadius: 8, alignItems: "center", margin: 5 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    imagePicker: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        alignSelf: "center",
        marginBottom: 10,
    },
});
