import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function AddProduct() {
    const router = useRouter();
    const [product, setProduct] = useState({
        name: "",
        retailPrice: "",
        wholesalePrice: "",
        quantity: "",
        image: "",
        expiry: "",
        brand: ""
    });

    const handleAddProduct = () => {
        if (!product.name || !product.retailPrice || !product.wholesalePrice || !product.quantity || !product.image || !product.expiry || !product.brand) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        Alert.alert("Thành công", "Sản phẩm đã được thêm!");
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 60 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <AntDesign name="left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Thêm sản phẩm</Text>
                </View>

                <View style={styles.card}>
                    <TouchableOpacity style={styles.imageUpload}>
                        <View style={styles.imageUploadBox}>
                            <Entypo name="camera" size={40} color="#696969" />
                        </View>
                    </TouchableOpacity>
                    {product.image ? (
                        <Image source={{ uri: product.image }} style={styles.imagePreview} />
                    ) : null}
                    <TextInput
                        style={styles.input}
                        placeholder="URL ảnh"
                        value={product.image}
                        onChangeText={(text) => setProduct({ ...product, image: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tên sản phẩm"
                        value={product.name}
                        onChangeText={(text) => setProduct({ ...product, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Thương hiệu sản phẩm"
                        value={product.brand}
                        onChangeText={(text) => setProduct({ ...product, brand: text })}
                    />
                    <View style={styles.priceContainer}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Giá bán lẻ (VND)"
                            keyboardType="numeric"
                            value={product.retailPrice}
                            onChangeText={(text) => setProduct({ ...product, retailPrice: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Giá bán buôn (VND)"
                            keyboardType="numeric"
                            value={product.wholesalePrice}
                            onChangeText={(text) => setProduct({ ...product, wholesalePrice: text })}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Số lượng"
                        keyboardType="numeric"
                        value={product.quantity}
                        onChangeText={(text) => setProduct({ ...product, quantity: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Hạn sử dụng"
                        value={product.expiry}
                        onChangeText={(text) => setProduct({ ...product, expiry: text })}
                    />

                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Thêm sản phẩm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <Text style={styles.buttonTextCancel}>Hủy</Text>
                </TouchableOpacity></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e9f1ff" },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#699BF4",
        padding: 10,
        paddingBottom: 30,
        paddingTop: 30
    },
    backButton: {
        marginRight: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
        margin: 5
    },
    imageUpload: {
        alignItems: "center",
        marginBottom: 15,
    },
    imageUploadBox: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: "#d0d0d0",
        justifyContent: "center",
        alignItems: "center",
    },
    imagePreview: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    addButton: {
        backgroundColor: "#ed7c44",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#699BF4",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        margin: 5
    },
    cancelButton: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        margin: 5,
        borderColor: "#ed7c44",
        borderWidth: 2,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonTextCancel: {
        color: "#ed7c44",
        fontWeight: "bold",
        fontSize: 16,
    }
});
