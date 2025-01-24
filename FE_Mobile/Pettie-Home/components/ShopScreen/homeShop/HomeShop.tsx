import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={['#01b9bb', '#ed7c44']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Shop</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <FontAwesome name="bell" size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Tổng quan hằng ngày</Text>
        <View style={styles.statsList}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome className={item.icon} size={20} color="#2575fc" />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#555" />
          </TouchableOpacity>
        )}
      />

      {/* Growth Section */}
      <LinearGradient
        colors={['#f7971e', '#ffd200']}
        style={styles.growthContainer}
      >
        <Text style={styles.growthTitle}>
          Tối ưu hóa sản phẩm để nhận ShopTab Vouchers
        </Text>
        <Text style={styles.growthDescription}>
          Tối ưu hóa sản phẩm của bạn để có cơ hội nhận voucher và hỗ trợ lưu lượng truy cập nhiều hơn.
        </Text>
        <View style={styles.growthActions}>
          <TouchableOpacity style={styles.growthButton}>
            <Text style={styles.growthButtonText}>Tăng lưu lượng truy cập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.growthGoButton}>
            <Text style={styles.growthGoText}>Đi</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const stats = [
  { label: 'Doanh thu', value: '0đ' },
  { label: 'Đơn hàng', value: '0' },
  { label: 'Khách truy cập', value: '19' },
];

const menuItems = [
  { label: 'Nhiệm vụ', icon: 'tasks', badge: '14' },
  { label: 'Sản phẩm bị từ chối', icon: 'ban' },
  { label: 'Tăng trưởng', icon: 'line-chart' },
  { label: 'Video bán hàng', icon: 'video-camera' },
  { label: 'Trả hàng', icon: 'undo' },
  { label: 'Cơ hội sản phẩm', icon: 'shopping-bag' },
  { label: 'Chiến dịch', icon: 'bullhorn' },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationIcon: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 20,
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    margin: 10,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  statsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    margin: 10,
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  badge: {
    backgroundColor: '#f44',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 12,
  },
  growthContainer: {
    padding: 16,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  growthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  growthDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  growthActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  growthButton: {
    backgroundColor: '#f6c23e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  growthButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  growthGoButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  growthGoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
