import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getShopById, getUserAccount, updateShopById } from '@/services/shop/api';
import { ProfileShop } from '@/services/types';

const EditProfileShop = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileShop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user = await getUserAccount();
      if (!user?.id) throw new Error("Không tìm thấy ID người dùng");

      setShopId(user.id);
      const shopData = await getShopById(user.id);
      setProfile(shopData);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!shopId || !profile) {
      Alert.alert("Lỗi", "Dữ liệu không hợp lệ.");
      return;
    }

    try {
      const updatedProfile = await updateShopById(shopId, profile);
      setProfile(updatedProfile);
      setIsSuccessModalVisible(true);
      setTimeout(() => setIsSuccessModalVisible(false), 2000);
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: profile?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_PuGiOv6gDS4J7YTJkyDKGoGL2SzJAEY4A&s' }}
          style={styles.avatar}
        />
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
            value={profile?.fullname || ''}
            onChangeText={(text) => setProfile((prev) => (prev ? { ...prev, fullname: text } : prev))}
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
          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput style={styles.input} editable={false} value={profile?.birthDate || ''} />
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
