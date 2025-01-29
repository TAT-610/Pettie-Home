import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const EditProfileShop = () => {
  const router = useRouter();

  const [openingTime, setOpeningTime] = useState('9:00');
  const [closingTime, setClosingTime] = useState('18:00');
  const [description, setDescription] = useState(
    'Xin chào, chúng tôi có nhiều kinh nghiệm trong việc chải chuốt và tạo kiểu chuyên nghiệp cho thú cưng như chó, mèo và thỏ.'
  );
  const [shopName, setShopName] = useState('Violet Pet Shop');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [email, setEmail] = useState('nguoidung1@gmail.com');
  const [birthDate, setBirthDate] = useState('**/**/****');
  const [address, setAddress] = useState('234 LVV, p.Tân Phong, TPHCM');

  const handleSave = () => {
    // Xử lý lưu thông tin chỉnh sửa
    console.log('Thông tin đã được lưu:');
    console.log({
      openingTime,
      closingTime,
      description,
      shopName,
      phoneNumber,
      email,
      birthDate,
      address,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" /><Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://www.chamsocpet.com/wp-content/uploads/2021/04/beo-phi-o-thu-cung-2.jpg',
          }}
          style={styles.avatar}
        />
        
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <TextInput
              style={styles.input}
              value={openingTime}
              onChangeText={setOpeningTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Giờ đóng cửa</Text>
            <TextInput
              style={styles.input}
              value={closingTime}
              onChangeText={setClosingTime}
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
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.textCounter}>{description.length}/180</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên Shop</Text>
          <TextInput
            style={styles.input}
            value={shopName}
            onChangeText={setShopName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput
            style={styles.input}
            editable={false} // Không cho phép chỉnh sửa
            value={birthDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Lưu */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250, // Đặt chiều cao của header
    backgroundColor: '#ed7c44',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden', // Đảm bảo hình không tràn ra ngoài
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    flexDirection:'row',

  },
  avatar: {
    width: '100%', // Chiều rộng khớp toàn bộ header
    height: '100%', // Chiều cao khớp toàn bộ header
    resizeMode: 'cover', // Lấp đầy toàn bộ khung
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },
  form: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  textCounter: {
    textAlign: 'right',
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#ed7c44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default EditProfileShop;
