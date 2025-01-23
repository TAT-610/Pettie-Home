import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileShop = () => {
  const menuItems = [
    { label: 'Thông tin đơn hàng', icon: 'shopping-cart', value: null },
    { label: 'Thêm sản phẩm', icon: 'plus-circle', value: null },
    { label: 'Doanh thu', icon: 'money', value: 'đ 20.250.000' },
    { label: 'Đăng ký mở cửa hàng', icon: 'store', value: null },
    { label: 'Hỗ trợ', icon: 'question-circle', value: null },
    { label: 'Cài đặt', icon: 'cogs', value: null },
    { label: 'Điều khoản & Chính sách', icon: 'file-text', value: null },
    { label: 'Chỉnh sửa thông tin', icon: 'edit', value: null },
    { label: 'Thêm dịch vụ', icon: 'briefcase', value: null },
  ];

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
        <TouchableOpacity>
        <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Menu */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name='shopping-cart' size={20} color="#4CAF50" />
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
    borderRadius: 35,
    marginRight: 18,
  },
  shopName: {
    fontSize: 18,
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
    color: '#4CAF50',
  },
  logoutButton: {
    backgroundColor: '#ed7c44',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileShop;
