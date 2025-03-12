import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, Alert, Image, FlatList, TouchableOpacity, Text, StyleSheet,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { editProductById, getProductById } from "@/services/shop/apiproduct";
import { AntDesign } from "@expo/vector-icons";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<{
    id?: string;
    name: string;
    price: string;
    stock: string;
    image: { uri: string; type: string; fileName: string } | null;
    expiry: string;
    brand: string;
    description: string;
  }>({
    id: "",
    name: "",
    price: "",
    stock: "",
    image: null,
    expiry: "",
    brand: "",
    description: "",
  });

  // Fetch product details when the component mounts
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Fetch product details by ID
  const fetchProduct = async () => {
    try {
      const productData = await getProductById(id as string);
      if (!productData) {
        Alert.alert("Lỗi", "Không tìm thấy sản phẩm.");
        return;
      }
      setProduct({
        id: productData.id || "",
        name: productData.name || "",
        price: productData.price ? productData.price.toString() : "",
        stock: productData.stock ? productData.stock.toString() : "",
        image: productData.image
        ? {
            uri: productData.image.uri, 
            type: productData.image.type || "image/jpeg", // Giá trị mặc định
            fileName: productData.image.fileName || "default.jpg", // Giá trị mặc định
          }
        : null,
        expiry: productData.expiry || "",
        brand: productData.brand || "",
        description: productData.description || "",
      });
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm.");
    }
  };

  // Handle input changes
  const handleChange = useCallback(
    (field: keyof typeof product, value: string | number) => {
      setProduct((prev) => ({
        ...prev,
        [field]: field === "price" || field === "stock" ? parseFloat(value as string) || 0 : value,
      }));
    },
    []
  );

  // Handle image selection
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
      setProduct((prev) => ({
        ...prev,
        image: {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          fileName: result.assets[0].fileName || "upload.jpg",
        },
      }));
    }
  };

  // Handle product update
  const handleUpdateProduct = async () => {
    if (!product.name || !product.price || !product.stock) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      await editProductById(id as string, product);
      Alert.alert("Thành công", "Sản phẩm đã được cập nhật.");
      router.replace("/product");
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật sản phẩm thất bại.");
    }
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={() => (
        <View style={{ paddingBottom: 60 }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.header}>Chỉnh sửa sản phẩm</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {product.image?.uri ? (
                <Image source={{ uri: product.image.uri }} style={styles.imagePreview} />
              ) : (
                <Text>Chọn ảnh</Text>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Tên sản phẩm"
              value={product.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Thương hiệu sản phẩm"
              value={product.brand}
              onChangeText={(text) => handleChange("brand", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá bán (VND)"
              keyboardType="numeric"
              value={product.price.toString()}
              onChangeText={(text) => handleChange("price", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Số lượng"
              keyboardType="numeric"
              value={product.stock.toString()}
              onChangeText={(text) => handleChange("stock", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Chi tiết sản phẩm"
              value={product.description}
              onChangeText={(text) => handleChange("description", text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleUpdateProduct}>
              <Text style={styles.buttonText}>Cập nhật sản phẩm</Text>
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
    paddingTop: 30,
  },
  backButton: { marginRight: 10 },
  header: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  card: { backgroundColor: "#fff", padding: 20, marginBottom: 20, margin: 5 },
  imagePreview: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dropdown: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, backgroundColor: "#fff" },
  priceContainer: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  addButton: {
    backgroundColor: "#ed7c44",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 5,
  },
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