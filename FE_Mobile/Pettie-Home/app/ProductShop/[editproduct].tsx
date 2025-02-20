import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// Định nghĩa kiểu cho sản phẩm
type Product = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  status: string;
  image: string;
  expiry: string;
  description: string;
};

const EditProduct = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Dữ liệu sản phẩm giả định (thay thế bằng dữ liệu thực tế)
  const productsMock: Product[] = [
    {
      productId: "1",
      name: "Cát đậu nành Cature cho mèo 2.8kg",
      price: 232000,
      quantity: 10,
      status: "Đang hoạt động",
      image: "https://paddy.vn/cdn/shop/files/Thi_tk_ch_acoten_2.png?v=1690719510",
      expiry: "2025-12-31",
      description: "Cát đậu nành chất lượng cao cho mèo."
    },
  ];

  // Tìm sản phẩm dựa trên ID
  const productToEdit = productsMock.find((product) => product.productId === id);
  const [product, setProduct] = useState<Product | null>(productToEdit || null);

  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price.toString() : "");
  const [quantity, setQuantity] = useState(product ? product.quantity.toString() : "");
  const [expiry, setExpiry] = useState(product ? product.expiry : "");
  const [image, setImage] = useState(product ? product.image : "");
  const [desciption, setDescription] = useState(product ? product.description : "");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
      setExpiry(product.expiry);
      setImage(product.image);
      setDescription(product.description);
    }
  }, [product]);

  const handleSave = () => {
    router.push("/");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Chỉnh sửa sản phẩm</Text>
      </View>
      <View style={{backgroundColor: "#fff", paddingTop: 20, padding: 10,margin: 8}}>
      {product ? (
        <>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
          <Text style={styles.label}>URL Ảnh:</Text>
          <TextInput style={styles.input} value={image} onChangeText={setImage} />
          <Text style={styles.label}>Tên sản phẩm:</Text>
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
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      )}</View>
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
  container: { flex: 1, backgroundColor: "#e9f1ff"},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#fff',
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
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  buttonTextCancel: {
    color: "#ed7c44",
    fontWeight: "bold",
    fontSize: 16,
},
  errorText: { color: "red", fontSize: 16, textAlign: "center" },
});

export default EditProduct;
