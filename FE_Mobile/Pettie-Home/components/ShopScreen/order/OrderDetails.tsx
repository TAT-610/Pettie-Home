import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const orderDetails = {
  orderId: '#1009',
  status: 'Đang tiến hành',
  time: '27/01/2024 - 23:07:42',
  scheduledTime: "28/01/2024 - 10:00:00",
  items: [
    { id: '1', name: 'Cắt tỉa lông (Chó/Mèo) <3kg ', price: 420000, quantity: 1 },
    { id: '2', name: 'Tạo hình đặc biệt (Theo yêu cầu) ', price: 120000, quantity: 3 },
    { id: '3', name: 'Tạo hình đặc biệt (Theo yêu cầu) ', price: 200000, quantity: 2 },
    { id: '4', name: 'Tạo hình đặc biệt (Theo yêu cầu) ', price: 32000, quantity: 4 },
  ],
  subtotal: 925000,
  shipping: 15000,
  total: 935000,
  address: 'Đường 3/2, phường Long Thạnh Mỹ, Quận 9, HCM',
  paymentMethod: 'Tiền mặt khi nhận hàng',
};

export default function OrderDetails() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" /><Text style={styles.header}>Thông tin đơn hàng</Text>
        </TouchableOpacity>
      <Text style={styles.statusOrder}>Cuộc hẹn trước</Text>

      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Text style={styles.label}>Mã đơn hàng:</Text>
          <Text style={styles.value}>{orderDetails.orderId}</Text>
          <Text style={styles.label}>Thời gian đã tạo đơn:</Text>
          <Text style={styles.value}>{orderDetails.time}</Text>
        </View>
        <View style={styles.headerCard}>
          <Text style={styles.status}>{orderDetails.status}</Text>
          <Text style={styles.label}>Thời gian hẹn:</Text>
          <Text style={styles.value}>{orderDetails.scheduledTime}</Text>
        </View>

      </View>

      <View style={styles.carddetail}>
      <Text style={styles.sectionHeader}>Chi tiết đơn hàng</Text>
      <FlatList
        data={orderDetails.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.quantity}>x {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ</Text>
          </View>
        )}
      />
      </View>

      <View style={styles.divider} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng đơn hàng:</Text>
        <Text style={styles.totalAmount}>{orderDetails.subtotal.toLocaleString()} đ</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Phí vận chuyển:</Text>
        <Text style={styles.totalAmount}>{orderDetails.shipping.toLocaleString()} đ</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.finalTotalText}>Tổng cộng:</Text>
        <Text style={styles.finalTotalAmount}>{orderDetails.total.toLocaleString()} đ</Text>
      </View>

      <Text style={styles.sectionHeader}>Thông tin nhận hàng</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{orderDetails.address}</Text>
        <Text style={styles.label}>Phương thức thanh toán:</Text>
        <Text style={styles.value}>{orderDetails.paymentMethod}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    margin: 40
  },
  backButton: {
    

  },
  statusOrder: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#e6845e',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCard:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight:'500',
    marginTop: 5

  },
  status: {
    color: '#25923E',            // Màu chữ là xanh lá cây
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 13,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',  // Màu nền là trắng
    borderWidth: 2,            // Độ rộng đường viền
    borderColor: '#25923E'       // Màu đường viền là xanh lá cây  
  },
  carddetail:{
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    borderBottomWidth: 0.5,      // Độ dày đường kẻ
    borderBottomColor: '#222', // Màu sắc của đường kẻ (có thể thay đổi)
    paddingBottom: 13
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  finalTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  finalTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e63946',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});