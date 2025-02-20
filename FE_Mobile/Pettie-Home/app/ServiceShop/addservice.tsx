import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";  // Import the dropdown picker

export default function AddService() {
    const router = useRouter();
    const [service, setService] = useState({
        name: "",
        retailPrice: "",
        wholesalePrice: "",
        quantity: "",
        image: "",
        expiry: "",
        brand: "",
        serviceType: ""
    });

    // State for managing the dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(""); // Value of the dropdown
    const [items, setItems] = useState([
        { label: "Dịch vụ chó", value: "dog" },
        { label: "Dịch vụ mèo", value: "cat" },
    ]);

    const handleAddService = () => {
        if (
            !service.name ||
            !service.retailPrice ||
            !service.wholesalePrice ||
            !service.quantity ||
            !service.image ||
            !service.expiry ||
            !service.brand ||
            !service.serviceType
        ) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        Alert.alert("Thành công", "Dịch vụ đã được thêm!");
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 60 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <AntDesign name="left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Thêm dịch vụ</Text>
                </View>

                <View style={styles.card}>
                    <TouchableOpacity style={styles.imageUpload}>
                        <View style={styles.imageUploadBox}>
                            <Entypo name="camera" size={40} color="#696969" />
                        </View>
                    </TouchableOpacity>
                    {service.image ? (
                        <Image source={{ uri: service.image }} style={styles.imagePreview} />
                    ) : null}
                    <TextInput
                        style={styles.input}
                        placeholder="URL ảnh"
                        value={service.image}
                        onChangeText={(text) => setService({ ...service, image: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tên dịch vụ"
                        value={service.name}
                        onChangeText={(text) => setService({ ...service, name: text })}
                    />
                    <Text style={styles.label}>Chọn loại dịch vụ:</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={(val: string | null) => {
                            setValue(val);
                            setService({ ...service, serviceType: val || "" }); // Update service type
                        }}
                        setItems={setItems}
                        placeholder="Chọn loại dịch vụ"
                        containerStyle={{ marginBottom: 15 }}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Thương hiệu dịch vụ"
                        value={service.brand}
                        onChangeText={(text) => setService({ ...service, brand: text })}
                    />
                    <View style={styles.priceContainer}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Giá bán lẻ (VND)"
                            keyboardType="numeric"
                            value={service.retailPrice}
                            onChangeText={(text) => setService({ ...service, retailPrice: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Giá bán buôn (VND)"
                            keyboardType="numeric"
                            value={service.wholesalePrice}
                            onChangeText={(text) => setService({ ...service, wholesalePrice: text })}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Số lượng"
                        keyboardType="numeric"
                        value={service.quantity}
                        onChangeText={(text) => setService({ ...service, quantity: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Hạn sử dụng"
                        value={service.expiry}
                        onChangeText={(text) => setService({ ...service, expiry: text })}
                    />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddService} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Thêm dịch vụ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <Text style={styles.buttonTextCancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        paddingTop: 30,
    },
    backButton: {
        marginRight: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
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
        margin: 5,
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInput: {
        width: "48%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    dropdown: {
        borderColor: "#ddd",
        height: 50,
        justifyContent: "center",
    },
    dropdownContainer: {
        borderColor: "#ddd",
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
        margin: 5,
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
    },
});
