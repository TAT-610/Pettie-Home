import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getShopAccount, getUserAccount, updateShopById } from '@/services/shop/apiprofile';
import { ProfileShop } from '@/services/types';
import * as ImagePicker from 'expo-image-picker';

const EditProfileShop = () => {
  const { id } = useLocalSearchParams();
  console.log("Id Shop in EditProfileShop", id);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [profile, setProfile] = useState<{
    name: string;
    phone: string;
    description: string;
    email: string;
    address: string;
    openingTime: string;
    closingTime: string;
    imageUrl: { uri: string; type: string; fileName?: string } | null;
  }>({
    phone: "",
    name: "",
    email: "",
    openingTime: "",
    imageUrl: null,
    address: "",
    description: "",
    closingTime: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await getUserAccount();
        console.log("User Data:", user);
        if (!user?.data?.id) {
          throw new Error(`Không tìm thấy ID người dùng, dữ liệu nhận được: ${JSON.stringify(user)}`);
        }

        const shopData = await getShopAccount();
        if (!shopData || !shopData.id) {
          throw new Error(`Không tìm thấy dữ liệu shop, dữ liệu nhận được: ${JSON.stringify(shopData)}`);
        }
        setProfile(shopData);
        setShopId(shopData.id);
      } catch (error) {
        console.error("Fetch Data Error:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu hồ sơ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSave = async () => {
    try {
      await updateShopById(profile);
      Alert.alert("Thành công", "Profile đã được cập nhật.");
      router.replace("/homeShop");
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật profile thất bại.");
    }
  };

  const handlePickImage = async () => {
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
      setProfile((prev) => ({
        ...prev,
        image: {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          fileName: result.assets[0].fileName || "upload.jpg",
        },
      }));
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
          {profile?.imageUrl ? (
            <Image source={{ uri: profile.imageUrl ? `https://pettiehome.online/web/${profile.imageUrl}` : 'default-image-url.jpg' }} style={styles.imagePreview} />
          ) : (
            <Text>Chọn ảnh</Text>
          )}
          <AntDesign name="camera" size={24} color="white" style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <TextInput
              style={styles.input}
              value={profile?.openingTime || ''}
              onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, openingTime: text } : prev))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ đóng cửa</Text>
            <TextInput
              style={styles.input}
              value={profile?.closingTime || ''}
              onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, closingTime: text } : prev))}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Miêu tả</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            numberOfLines={4}
            maxLength={180}
            value={profile?.description || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, description: text } : prev))}
          />
          <Text style={styles.textCounter}>{profile?.description?.length || 0}/180</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên Shop</Text>
          <TextInput
            style={styles.input}
            value={profile?.name || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, name: text } : prev))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={profile?.phone || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, phone: text } : prev))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={profile?.email || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, email: text } : prev))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={profile?.address || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, address: text } : prev))}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={isSuccessModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign name="checkcircle" size={50} color="#4CAF50" />
            <Text style={styles.modalText}>Cập nhật thành công!</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    backgroundColor: '#ed7c44',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row'
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  avatarContainer: { position: 'relative', marginTop: 20 },
  imagePreview: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },

  cameraIcon: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#00000080', padding: 5, borderRadius: 15 },
  form: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: '#555', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9'
  },
  textarea: { height: 80, textAlignVertical: 'top' },
  textCounter: { textAlign: 'right', fontSize: 12, color: '#888' },
  saveButton: { backgroundColor: '#ed7c44', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }
});

export default EditProfileShop;
