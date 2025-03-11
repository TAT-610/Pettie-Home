import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { editProfileShop } from '@/services/user/auth';

const EditProfileShop = () => {
  const { profile } = useLocalSearchParams();
  // Đảm bảo `profile` là string trước khi parse
  const parsedProfile = typeof profile === "string" ? JSON.parse(decodeURIComponent(profile)) : null;
  console.log("Profile in EditProfile:", parsedProfile);

  // State để lưu thông tin profile
  const [profileData, setProfileData] = useState(parsedProfile || {});
  // Or explicitly type it inline
  const [selectedImage, setSelectedImage] = useState<{ uri: string; fileName: string; type: string } | null>(null);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isUploading, setUploading] = useState(false);

  // Hàm chọn ảnh từ thư viện
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // Get file name from uri
      const fileName = uri.split('/').pop() || 'profile.jpg';
      // Infer the type of the image
      const type = 'image/' + (fileName.split('.').pop() === 'png' ? 'png' : 'jpeg');

      // Set selected image data
      setSelectedImage({
        uri: uri,
        fileName: fileName,
        type: type
      });

      // Update the preview
      setProfileData((prev: any) => ({
        ...prev,
        pictureUrl: uri
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("phone", profileData.phone);
      formData.append("description", profileData.description);
      formData.append("address", profileData.address);
      formData.append("openingTime", profileData.openingTime);
      formData.append("closingTime", profileData.closingTime);
      formData.append("bankAccountNumber", profileData.bankAccountNumber);
      formData.append("bankName", profileData.bankName);
      formData.append("bankAccountName", profileData.bankAccountName);
  
      // Nếu có ảnh mới, thêm vào FormData
      if (selectedImage) {
        formData.append("image", {
          uri: selectedImage.uri,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      }
  
      const response = await editProfileShop(profileData, formData);
  
      if (response?.data) {
        setProfileData(response.data);
        setSuccessModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại.");
      console.error("Lỗi cập nhật hồ sơ:", error);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#333" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity onPress={handlePickImage} disabled={isUploading}>
        <Image
  source={{
    uri: selectedImage
      ? selectedImage.uri
      : profileData.imageUrl
      ? `https://pettiehome.online/web/${profileData.imageUrl}`
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZPYOSQUJW4zOM9FTxASvMzRDAUaVmJCGFQ&s',
  }}
  style={styles.avatar}
/>
          {isUploading && <Text style={styles.uploadingText}>Đang tải...</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <TextInput
              style={styles.input}
              value={profileData?.openingTime || ''}
              onChangeText={(text) => setProfileData({ ...profileData, openingTime: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ đóng cửa</Text>
            <TextInput
              style={styles.input}
              value={profileData?.closingTime || ''}
              onChangeText={(text) => setProfileData({ ...profileData, closingTime: text })}
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
            value={profileData?.description || ''}
            onChangeText={(text) => setProfileData({ ...profileData, description: text })}
          />
          <Text style={styles.textCounter}>{profileData?.description?.length || 0}/180</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên Shop</Text>
          <TextInput
            style={styles.input}
            value={profileData?.name || ''}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={profileData.phone}
            onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            editable={false} // Không cho chỉnh sửa email
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={profileData?.address || ''}
            onChangeText={(text) => setProfileData({ ...profileData, address: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isUploading && styles.disabledButton]}
          onPress={handleSaveProfile}
          disabled={isUploading}
        >
          <Text style={styles.saveButtonText}>{isUploading ? 'Đang lưu...' : 'Lưu'}</Text>
        </TouchableOpacity>
      </View>

      {/* Popup thành công */}
      <Modal
        transparent
        visible={isSuccessModalVisible}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <AntDesign name="checkcircle" size={50} color="#4CAF50" />
            <Text style={styles.modalText}>Cập nhật thành công!</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e9f1ff' },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    overflow: 'hidden'
  },
  uploadingText: { color: "#fff", },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: "17%",
  },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  avatarContainer: { position: 'relative', marginTop: 20 },
  imagePreview: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
  cameraIcon: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#00000080', padding: 5, borderRadius: 15 },
  form: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginRight: 40, marginLeft: 40 },
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
  saveButton: { backgroundColor: '#ed7c44', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#cccccc', },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff', },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }
});

export default EditProfileShop;