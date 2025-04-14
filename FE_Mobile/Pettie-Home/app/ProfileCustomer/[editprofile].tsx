import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { editProfileUser } from '@/services/user/auth';

const EditProfileShop = () => {
  const { profile } = useLocalSearchParams();
  // Đảm bảo `profile` là string trước khi parse
  const parsedProfile = typeof profile === "string" ? JSON.parse(decodeURIComponent(profile)) : null;
  console.log("Profile in EditProfile:", parsedProfile);

  // State để lưu thông tin profile
  const [profileData, setProfileData] = useState(parsedProfile || {});
  // Or explicitly type it inline
  const [selectedImage, setSelectedImage] = useState<{ uri: string; pictureFileName: string; type: string } | null>(null);
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
      const pictureFileName = uri.split('/').pop() || 'profile.jpg';
      // Infer the type of the image
      const type = 'image/' + (pictureFileName.split('.').pop() === 'png' ? 'png' : 'jpeg');

      // Set selected image data
      setSelectedImage({
        uri: uri,
        pictureFileName: pictureFileName,
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
      formData.append("email", profileData.email);

      // Nếu có ảnh mới, thêm vào FormData
      if (selectedImage) {
        formData.append("image", {
          uri: selectedImage.uri,
          name: selectedImage.pictureFileName,
          type: selectedImage.type,
        });
      }

      const response = await editProfileUser(profileData);

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
                : profileData.pictureUrl
                  ? `https://pettiehome.online/web/${profileData.pictureUrl}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZPYOSQUJW4zOM9FTxASvMzRDAUaVmJCGFQ&s',
            }}
            style={styles.avatar}
          />
          {isUploading && <Text style={styles.uploadingText}>Đang tải...</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={profileData?.fullName || ''}
            onChangeText={(text) => setProfileData({ ...profileData, fullName: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={profileData.phoneNumber}
            onChangeText={(text) => setProfileData({ ...profileData, phoneNumber: text })}
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
  form: { padding: 20 },
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
  saveButton: { backgroundColor: '#ed7c44', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#cccccc', },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff', },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }
});

export default EditProfileShop;