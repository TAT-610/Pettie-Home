import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// Define the type for service
type Service = {
  serviceId: string;
  name: string;
  price: number;
  quantity: number;
  status: string;
  image: string;
  expiry: string;
  description: string;
};

export default function EditService  ()  {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock data for services (replace with real data)
  const servicesMock: Service[] = [
    {
      serviceId: "1",
      name: "Dịch vụ cắt tỉa cho chó",
      price: 500000,
      quantity: 5,
      status: "Đang hoạt động",
      image: "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg",
      expiry: "2025-12-31",
      description: "Dịch vụ cắt tỉa cho chó chất lượng cao.",
    },
  ];

  // Find the service by ID
  const serviceToEdit = servicesMock.find((service) => service.serviceId === id);
  const [service, setService] = useState<Service | null>(serviceToEdit || null);

  const [name, setName] = useState(service ? service.name : "");
  const [price, setPrice] = useState(service ? service.price.toString() : "");
  const [quantity, setQuantity] = useState(service ? service.quantity.toString() : "");
  const [expiry, setExpiry] = useState(service ? service.expiry : "");
  const [image, setImage] = useState(service ? service.image : "");
    const [desciption, setDescription] = useState(service ? service.description : "");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setPrice(service.price.toString());
      setQuantity(service.quantity.toString());
      setExpiry(service.expiry);
      setImage(service.image);
      setDescription(service.description);
    }
  }, [service]);

  const handleSave = () => {
    router.push("/"); // Navigate to the homepage or service list
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Chỉnh sửa dịch vụ</Text>
      </View>
      <View style={{ backgroundColor: "#fff", paddingTop: 20, padding: 10, margin: 8 }}>
        {service ? (
          <>
            {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
            <Text style={styles.label}>URL Ảnh:</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} />
            <Text style={styles.label}>Tên dịch vụ:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Mô tả: </Text>
            <TextInput style={styles.input} value={desciption} onChangeText={setDescription} />
            <Text style={styles.label}>Giá:</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Text style={styles.label}>Số lượng:</Text>
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <Text style={styles.label}>Hạn sử dụng:</Text>
            <TextInput style={styles.input} value={expiry} onChangeText={setExpiry} />
          </>
        ) : (
          <Text style={styles.errorText}>Không tìm thấy dịch vụ</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("/")}>
        <Text style={styles.buttonTextCancel}>Hủy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f1ff" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  image: { width: 100, height: 100, marginBottom: 10, borderRadius: 10 },
  button: {
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
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  buttonTextCancel: {
    color: "#ed7c44",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: { color: "red", fontSize: 16, textAlign: "center" },
});


