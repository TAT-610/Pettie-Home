import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getAllCategories } from "@/services/shop/apiproduct";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { createServices } from "@/services/shop/apiService";

export default function AddService() {
    const router = useRouter();

    const [service, setService] = useState<{
        categoryId: string;
        name: string;
        price: string;
        image: { uri: string; type: string; fileName: string } | null;
        description: string;
    }>({
        categoryId: "",
        name: "",
        price: "",
        image: null,
        description: "",
    });

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data.map((cat) => ({ label: cat.name, value: cat.id })));
            } catch (error) {
                console.error("Lỗi lấy danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = useCallback(
        (field: keyof typeof service, value: string | number) => {
            setService((prev) => ({
                ...prev,
                [field]: field === "price" ? parseFloat(value as string) || 0 : value,
            }));
        },
        []
    );

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
        if (!service.name || !service.categoryId) {
            Alert.alert("Lỗi", "Vui lòng nhập tên sản phẩm và chọn danh mục!");
            return;
        }
        try {
            let formData = new FormData();
            formData.append("categoryId", service.categoryId);
            formData.append("name", service.name);
            formData.append("price", service.price);
            formData.append("description", service.description);
    
            // Kiểm tra nếu có hình ảnh thì thêm vào FormData
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
        <FlatList
            data={[{ key: "form" }]} // Dummy data để render form trong FlatList
            renderItem={() => (
                <View style={{ paddingBottom: 60 }}>
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
                            placeholder="Tên sản phẩm"
                            value={service.name}
                            onChangeText={(text) => handleChange("name", text)}
                        />
                        <View style={{ zIndex: 1000, marginBottom: 17 }}>
                            <DropDownPicker
                                open={open}
                                value={category}
                                items={categories}
                                setOpen={setOpen}
                                setValue={setCategory}
                                setItems={setCategories}
                                placeholder="Chọn loại danh mục"
                                onChangeValue={(val) => {
                                    if (val) {
                                        setCategory(val);
                                        setService((prev) => ({ ...prev, categoryId: val })); // Cập nhật categoryId
                                    }
                                }}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Giá bán (VND)"
                            keyboardType="numeric"
                            value={service.price.toString()}
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
                </View>
            )}
            keyExtractor={(item) => item.key}
        />

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e9f1ff" },
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
    dropdown: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, backgroundColor: "#fff" },
    priceContainer: { flexDirection: "row", justifyContent: "space-between" },
    halfInput: { width: "48%" },
    addButton: { backgroundColor: "#ed7c44", padding: 15, borderRadius: 8, alignItems: "center", margin: 5 },
    cancelButton: { backgroundColor: "#fff", padding: 15, borderRadius: 8, alignItems: "center", margin: 5, borderColor: "#ed7c44", borderWidth: 2 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    buttonTextCancel: { color: "#ed7c44", fontWeight: "bold", fontSize: 16 },
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
