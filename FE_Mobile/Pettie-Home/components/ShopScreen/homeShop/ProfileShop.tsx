import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const ProfileShop = () => {
  const router = useRouter();
  const handleEditProfile = () => {
    router.push("/editprofile");
  };

  const stats = [
    { label: 'Doanh thu', value: '0đ' },
    { label: 'Đơn hàng', value: '0' },
    { label: 'Khách truy cập', value: '19' },
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
        <TouchableOpacity style={styles.notificationIcon}>
          <FontAwesome name="bell" size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

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

      {/* Menu */}
      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <FontAwesome name="shopping-cart" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Thông tin đơn hàng</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <Ionicons name="add-circle" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Thêm sản phẩm</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <FontAwesome5 name="money-bill-wave" size={19} style={{ marginRight: -2 }} color="#4CAF50" />
          <Text style={styles.menuText}>Doanh thu</Text>
        </View>
        <Text style={styles.menuValue}>20.250.000 đ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <Ionicons name="storefront-sharp" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Đăng ký mở cửa hàng</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <FontAwesome name="question-circle-o" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Hỗ trợ</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <FontAwesome name="cogs" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Cài đặt</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <FontAwesome name="file-text" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Điều khoản & Chính sách</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
        <View style={styles.menuItemLeft}>
          <FontAwesome name="edit" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Chỉnh sửa thông tin</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <View style={styles.menuItemLeft}>
          <FontAwesome5 name="briefcase-medical" size={20} color="#4CAF50" />
          <Text style={styles.menuText}>Thêm dịch vụ</Text>
        </View>
      </TouchableOpacity>

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
  notificationIcon: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 20,
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
    margin: 9,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
    marginBottom: 30
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
});

export default ProfileShop;
