import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getProfileById, updateProfile } from '../../../services/api';

const EditProfileShop = () => {
  const router = useRouter();
  const profileId = '1'; // ID của shop cần lấy (có thể thay đổi nếu cần)

  // State lưu thông tin hồ sơ
  const [profile, setProfile] = useState({
    id: '',
    shopName: '',
    phoneNumber: '',
    description: '',
    email: '',
    birthDate: '',
    address: '',
    openingTime: '',
    closingTime: '',
    avatar: ''
  });

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  // Lấy dữ liệu hồ sơ khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileById(profileId);
        setProfile(data);
      } catch (error) {
        console.error('Lỗi khi lấy hồ sơ:', error);
      }
    };
    fetchData();
  }, []);

  // Xử lý lưu dữ liệu khi người dùng nhấn "Lưu"
  const handleSave = async () => {
    if (!profile.id) {
      Alert.alert('Lỗi', 'Không tìm thấy ID của hồ sơ.');
      return;
    }

    try {
      await updateProfile(profile.id, {
        shopName: profile.shopName,
        phoneNumber: profile.phoneNumber,
        description: profile.description,
        email: profile.email,
        address: profile.address,
        openingTime: profile.openingTime,
        closingTime: profile.closingTime,
        avatar: profile.avatar,
      });
  
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
        router.back(); 
      }, 2000); // Ẩn sau 2 giây
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Lỗi', 'Cập nhật hồ sơ thất bại.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: profile?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_PuGiOv6gDS4J7YTJkyDKGoGL2SzJAEY4A&s' }}
          style={styles.avatar}
          onError={() => setProfile(prev => ({ ...prev, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_PuGiOv6gDS4J7YTJkyDKGoGL2SzJAEY4A&s' }))}
        />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <TextInput
              style={styles.input}
              value={profile.openingTime}
              onChangeText={(text) => setProfile({ ...profile, openingTime: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ đóng cửa</Text>
            <TextInput
              style={styles.input}
              value={profile.closingTime}
              onChangeText={(text) => setProfile({ ...profile, closingTime: text })}
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
            value={profile.description}
            onChangeText={(text) => setProfile({ ...profile, description: text })}
          />
          <Text style={styles.textCounter}>{profile.description.length}/180</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên Shop</Text>
          <TextInput
            style={styles.input}
            value={profile.shopName}
            onChangeText={(text) => setProfile({ ...profile, shopName: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={profile.phoneNumber}
            onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput style={styles.input} editable={false} value={profile.birthDate} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={profile.address}
            onChangeText={(text) => setProfile({ ...profile, address: text })}
          />
        </View>

        {/* Lưu */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Popup thành công */}
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
    zIndex: 10,
    flexDirection: 'row'
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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

export default EditProfileShop;
