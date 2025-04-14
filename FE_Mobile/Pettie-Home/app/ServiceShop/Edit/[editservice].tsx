import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { editServiceById, getServiceById } from "@/services/shop/apiService";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

export default function EditService() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [service, setService] = useState<{
    id?: string;
    name: string;
    price: string;
    image: { uri: string; type: string; fileName: string } | null;
    description: string;
    categoryId: string;
  }>({
    id: "",
    name: "",
    price: "",
    image: null,
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const serviceData = await getServiceById(id as string);
      if (!serviceData) {
        Alert.alert("Lỗi", "Không tìm thấy sản phẩm.");
        return;
      }
      setService({
        id: serviceData.id || "",
        name: serviceData.name || "",
        categoryId: serviceData.categoryId || "",
        price: serviceData.price ? serviceData.price.toString() : "",
        image: serviceData.image
          ? {
              uri: serviceData.image.uri,
              type: serviceData.image.type || "image/jpeg", // Giá trị mặc định
              fileName: serviceData.image.fileName || "default.jpg", // Giá trị mặc định
            }
          : null,
        description: serviceData.description || "",
      });
      setCategory(serviceData.categoryId);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải thông tin dich vu.");
    }
  };

  const handleChange = useCallback(
    (field: keyof typeof service, value: string | number) => {
      setService((prev) => ({
        ...prev,
        [field]: field === "price" ? parseFloat(value as string) || 0 : value,
      }));
    },
    []
  );

  // Handle image selection
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  // Handle product update
  const handleUpdateServicet = async () => {
    if (!service.name || !service.price) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin dich vu.");
      return;
    }

    try {
      await editServiceById(id as string, service);
      Alert.alert("Thành công", "Dich vu đã được cập nhật.");
      router.replace("/services");
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật dich vu thất bại.");
    }
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      keyExtractor={(item) => item.key} // ✅ Đặt đúng vị trí
      renderItem={() => (
        <View style={{ paddingBottom: 60 }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.header}>Chỉnh sửa dịch vụ</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {service.image?.uri ? (
                <Image
                  source={{ uri: service.image.uri }}
                  style={styles.imagePreview}
                />
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
                    setService((prev) => ({ ...prev, categoryId: val }));
                  }
                }}
              />
            </View>
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleUpdateServicet}
            >
              <Text style={styles.buttonText}>Chỉnh sửa dịch vụ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
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
