import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const statusSteps = ['Chờ ngày hẹn', 'Đến cuộc hẹn', 'Đang tiến hành', 'Đã hoàn thành'];

const orderDetails = {
  orderId: '#1009',
  status: 'Đang tiến hành',
  time: '27/01/2024 - 23:07:42',
  scheduledTime: "28/01/2024 - 10:00:00",
  items: [
    { id: '1', name: 'Cắt tỉa lông (Chó/Mèo) <3kg ', price: 420000, quantity: 1, image: "" },
    { id: '2', name: 'Tạo hình đặc biệt (Theo yêu cầu) ', price: 120000, quantity: 3, image: "" },
    { id: '3', name: 'Bánh quy cho chó ', price: 32000, quantity: 4, image: "https://paddy.vn/cdn/shop/files/snack-cho-cho-banh-quy-doggyman_5.jpg?v=1732863422", },
    {
      id: '4', name: 'Pate mèo kucinta gói 80g ', price: 32000, quantity: 4, image:
        "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
    },
    {
      id: '5', name: 'Cát đậu nành Cature cho mèo 2.8kg ', price: 32000, quantity: 4, image:
        "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
    },

  ],
  subtotal: 925000,
  shipping: 15000,
  total: 935000,
  address: 'Đường 3/2, phường Long Thạnh Mỹ, Quận 9, HCM',
  paymentMethod: 'Tiền mặt',
  paymentTime: "28/01/2024 - 10:05:00",
  customerName: 'Nguyễn Văn A',
  customerPhone: '0123456789',
  customerNote: 'Vui lòng gọi điện trước khi đến để xác nhận lịch hẹn.',
};

export default function OrderDetails() {
  const router = useRouter();
  const [order, setOrder] = useState(orderDetails);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Thông tin đơn hàng</Text>
      </View>
      <Text style={styles.statusOrder}>Thông tin lịch hẹn</Text>

      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Text style={styles.label}>Mã đơn hàng:</Text>
          <Text style={styles.value}>{orderDetails.orderId}</Text>
          <Text style={styles.label}>Thời gian đã tạo đơn:</Text>
          <Text style={styles.value}>{orderDetails.time}</Text>
        </View>
        <View style={styles.headerCard}>
          <TouchableOpacity
            onPress={() => {
              const currentIndex = statusSteps.indexOf(order.status);
              if (currentIndex < statusSteps.length - 1) setIsModalVisible(true);
            }}
          >
            <View style={styles.status}>
              <Entypo name="controller-record" size={24} color="#25923E" />
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Thời gian hẹn:</Text>
          <Text style={styles.value}>{orderDetails.scheduledTime}</Text>
        </View>
      </View>

      <View style={styles.cardinfo}>
        <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tên khách hàng:</Text>
          <Text style={styles.infoValue}>{orderDetails.customerName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số điện thoại:</Text>
          <Text style={styles.infoValue}>{orderDetails.customerPhone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Địa chỉ:</Text>
          <Text style={styles.infoValue}>{orderDetails.address}</Text>
        </View>
      </View>

      <View style={styles.carddetail}>
        <Text style={styles.sectionHeader}>Chi tiết đơn hàng</Text>
        <FlatList
          nestedScrollEnabled={true}
          data={orderDetails.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} đ</Text>
              </View>
              <Text style={styles.quantity}>x {item.quantity}</Text>
            </View>
          )}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng đơn hàng:</Text>
          <Text style={styles.totalAmount}>{orderDetails.subtotal.toLocaleString()} đ</Text>
        </View>
        <View style={styles.totalContainerFee}>
          <Text style={styles.totalText}>Phí vận chuyển:</Text>
          <Text style={styles.totalAmount}>{orderDetails.shipping.toLocaleString()} đ</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.finalTotalText}>Tổng cộng:</Text>
          <Text style={styles.finalTotalAmount}>{orderDetails.total.toLocaleString()} đ</Text>
        </View>
      </View>

      <View style={styles.cardpayment}>
        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Phương thức thanh toán</Text>
          <Text style={styles.infoValue}>{orderDetails.paymentMethod}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thời gian đặt hàng:</Text>
          <Text style={styles.value}>{orderDetails.time}</Text>
          <Text style={styles.infoLabel}>Thời gian thanh toán:</Text>
          <Text style={styles.value}>{orderDetails.paymentTime}</Text>
        </View>
      </View>

      <View style={styles.cardNote}>
        <Text style={styles.sectionHeader}>Lưu ý của khách hàng</Text>
        <Text style={styles.noteText}>{orderDetails.customerNote}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    maxWidth: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    margin: 20,
    right: 10,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statusOrder: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#e6845e',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: "#fff"
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
    flexWrap: 'wrap',
  },
  headerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    flex: 1,
    minWidth: Dimensions.get('window').width * 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  value: {
    fontSize: 16,
    color: '#696969',
    fontWeight: '500',
    paddingBottom: 10,

  },
  status: {
    flexDirection: 'row',  // Căn theo hàng ngang
    alignItems: 'center',   // Căn giữa icon và chữ
    justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
    marginTop: 13,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#25923E',
    marginBottom: 15
  },
  statusText: {
    color: '#25923E',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,  // Tạo khoảng cách giữa icon và chữ
  },
  carddetail: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#222',
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    paddingBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    flex: 3,
    flexShrink: 1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'medium',
    flexWrap: 'wrap',  // Cho phép xuống dòng
    maxWidth: '90%',
    marginBottom: 3
  },
  quantity: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ed7c44',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  totalContainerFee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    margin: 5,
  },
  totalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 14,
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
    color: '#ed7c44',
  },
  cardinfo: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardpayment:{
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20
  },
  infoRow: {
    flexDirection: 'column',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  cardNote: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginBottom: 50
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});