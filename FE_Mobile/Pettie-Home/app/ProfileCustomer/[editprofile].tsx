import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { editProfileUser, uploadAvatar } from '@/services/user/auth';
import * as ImagePicker from "expo-image-picker";


const EditProfile = () => {
  const { profile } = useLocalSearchParams();
  // Đảm bảo `profile` là string trước khi parse
  const parsedProfile = typeof profile === "string" ? JSON.parse(decodeURIComponent(profile)) : null;
  console.log("Profile in EditProfile:", parsedProfile);

  // State để lưu thông tin profile
  const [profileData, setProfileData] = useState(parsedProfile || {});

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
      const imageUri = result.assets[0].uri;
      handleUploadAvatar(imageUri);
    }
  };

   // Hàm tải ảnh lên server
   const handleUploadAvatar = async (imageUri: string) => {
    try {
      setUploading(true);
      const response = await uploadAvatar(imageUri);
      setProfileData((prev: any) => ({ ...prev, pictureUrl: response.avatarUrl }));
      Alert.alert("Thành công", "Ảnh đại diện đã được cập nhật!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };


  const handleSaveProfile = async () => {
    try {
      await editProfileUser({
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
      });

      setSuccessModalVisible(true); // Hiển thị thông báo thành công
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#333" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        {/* Avatar */}
        <TouchableOpacity onPress={handlePickImage} disabled={isUploading}>
          <Image
            source={{
              uri:
                profileData.pictureUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_PuGiOv6gDS4J7YTJkyDKGoGL2SzJAEY4A&s",
            }}
            style={styles.avatar}
          />
          {isUploading && <Text style={styles.uploadingText}>Đang tải...</Text>}
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên người dùng</Text>
          <TextInput
            style={styles.input}
            value={profileData.fullName}
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

        {/* Lưu */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Popup thành công */}
      <Modal
        transparent
        visible={isSuccessModalVisible}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)} // Bấm nút back trên Android sẽ đóng modal
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSuccessModalVisible(false)} // Nhấn ra ngoài sẽ đóng modal
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
    backgroundColor: '#ed7c44',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },
  uploadingText: { color: "#fff", marginTop: 5 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    flexDirection: 'row'
  },
  // avatar: {
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover'
  // },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  form: { padding: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40
  },
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
  textCounter: { textAlign: 'right', fontSize: 12, color: '#888', marginTop: 5 },
  saveButton: {
    backgroundColor: '#ed7c44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginTop: 10 },

  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});

export default EditProfile;
