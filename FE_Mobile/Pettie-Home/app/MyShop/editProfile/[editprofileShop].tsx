import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getShopById, getUserAccount, updateShopById } from '@/services/shop/apiprofile';
import { ProfileShop } from '@/services/types';
import * as ImagePicker from 'expo-image-picker';

const EditProfileShop = () => {
  const { id } = useLocalSearchParams();
  console.log("Id Shop in EditProfileShop", id);

  const router = useRouter();
  const [profile, setProfile] = useState<ProfileShop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const user = await getUserAccount();
      console.log("User Data:", user);
      if (!user?.data?.id) {
        throw new Error(`Không tìm thấy ID người dùng, dữ liệu nhận được: ${JSON.stringify(user)}`);
      }

      const shopData = await getShopById();
      if (!shopData || !shopData.id) {
        throw new Error(`Không tìm thấy dữ liệu shop, dữ liệu nhận được: ${JSON.stringify(shopData)}`);
      }
      setProfile(shopData);
      setShopId(shopData.id);
    } catch (error) {
      console.error("Fetch Data Error:", error);
      Alert.alert("Lỗi","Không thể tải dữ liệu hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


const handleSave = async () => {
  if (!shopId || !profile) {
    Alert.alert("Lỗi", "Dữ liệu không hợp lệ.");
    return;
  }

  try {
    const updatedProfile = await updateShopById(shopId, {
      ...profile, // Gửi toàn bộ dữ liệu profile
    });
    setProfile(updatedProfile);
    setIsSuccessModalVisible(true);
    setTimeout(() => setIsSuccessModalVisible(false), 2000);
    router.push(`/homeShop`); // Điều hướng về trang Profile
  } catch (error) {
    Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại.");
  }
};

const handlePickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền truy cập thư viện ảnh.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [ImagePicker.MediaType.IMAGE], // Cập nhật API mới
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  // if (!result.canceled && result.assets?.length > 0) {
  //   setProfile((prev) => (prev ? { ...prev, imageUrl: result.assets[0].uri } : prev));
  // }
};


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
          {/* <Image
            source={{ uri: profile?.imageUrl || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          /> */}
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
