import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { editProductById, getAllCategories, getProductById } from "@/services/shop/apiproduct";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<{
    id?: string; // Thêm id với kiểu dữ liệu tùy chọn
    categoryId: string;
    name: string;
    price: string;
    stock: string;
    image: { uri: string; type: string; fileName: string } | null;
    expiry: string;
    brand: string;
    description: string;
  }>({
    id: "", // Giá trị mặc định
    categoryId: "",
    name: "",
    price: "",
    stock: "",
    image: null,
    expiry: "",
    brand: "",
    description: "",
  });

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(id);
      if (!productData) {
        Alert.alert("Error", "Product not found.");
        return;
      }

      setProduct({
        id: productData.id || "",
        categoryId: productData.categoryId || "",
        name: productData.name || "",
        price: productData.price || "",
        stock: productData.stock || "",
        expiry: productData.expiry || "",
        brand: productData.brand || "",
        description: productData.description || "",
        image: productData.image || "", // Xử lý nếu `imageUrl` không tồn tại
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product data.");
      console.error("Error fetching product:", error);
    }
  };

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
    (field: keyof typeof product, value: string | number) => {
      setProduct((prev) => ({
        ...prev,
        [field]: field === "price" || field === "stock" ? parseFloat(value as string) || 0 : value,
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

  const handleUpdateProduct = async () => {
    if (!product) return;

    if (!product.name.trim()) {
      Alert.alert("Error", "Product name cannot be empty.");
      return;
    }

    if (!product.categoryId.trim()) {
      Alert.alert("Error", "Category ID cannot be empty.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryId", product.categoryId);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("expiry", product.expiry);
      formData.append("brand", product.brand);
      formData.append("description", product.description);

      if (product.image) {
        formData.append("image", {
          uri: product.image.uri,
          name: product.image.fileName,
          type: product.image.type,
        } as any);
      }

      console.log("🚀 FormData gửi đi:", formData);
      await editProductById(id, formData as any);

      Alert.alert("Success", "Product updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Unable to update product. Please try again.");
      console.error("Error updating product:", error);
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
            <Text style={styles.header}>Chỉnh sửa sản phẩm</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {product.image ? (
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
            <View style={{ zIndex: 1000, marginBottom: 17 }}>
              <DropDownPicker
                open={open}
                value={category}
                items={categories}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setCategories}
                placeholder="Chọn danh mục"
                onChangeValue={(val) => {
                  if (val) {
                    setCategory(val);
                    setProduct((prev) => ({ ...prev, categoryId: val })); // Cập nhật categoryId
                  }
                }}
              />
            </View>
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
  cancelButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 5,
    borderColor: "#ed7c44",
    borderWidth: 2,
  },
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