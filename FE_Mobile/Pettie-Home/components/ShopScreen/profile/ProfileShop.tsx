import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const ProfileShop = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleEditProfile = () => {
    router.push("/profileShop/editprofile");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#01b9bb', '#ed7c44']} style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK35lrkGleTsoX6U_ecq2LcOhdjoXc31O4Q&s',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.shopName}>Violet Pet Shop</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>5.0</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleEditProfile}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Menu */}
      <FlatList
        data={[
          { icon: <FontAwesome name='shopping-cart' size={20} color="#4CAF50" />, label: "Thông tin đơn hàng" },
          { icon: <Ionicons name="add-circle" size={20} color="#4CAF50" />, label: "Thêm sản phẩm" },
          { icon: <FontAwesome5 name="money-bill-wave" size={19} style={{marginRight: -2}} color="#4CAF50" />, label: "Doanh thu", value: "20.250.000 đ" },
          { icon: <Ionicons name="storefront-sharp" size={20} color="#4CAF50" />, label: "Đăng ký mở cửa hàng" },
          { icon: <FontAwesome name='question-circle-o' size={20} color="#4CAF50" />, label: "Hỗ trợ" },
          { icon: <FontAwesome name='cogs' size={20} color="#4CAF50" />, label: "Cài đặt" },
          { icon: <FontAwesome name='file-text' size={20} color="#4CAF50" />, label: "Điều khoản & Chính sách" },
          { icon: <FontAwesome name='edit' size={20} color="#4CAF50" />, label: "Chỉnh sửa thông tin" },
          { icon: <FontAwesome5 name="briefcase-medical" size={20} color="#4CAF50" />, label: "Thêm dịch vụ" },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
          </TouchableOpacity>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 18,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 18,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  menuValue: {
    fontSize: 14,
    color: '#DC143C',
  },
  logoutButton: {
    backgroundColor: '#ed7c44',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileShop;
