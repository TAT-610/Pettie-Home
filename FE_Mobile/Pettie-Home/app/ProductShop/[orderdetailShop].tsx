import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const statusSteps = ['Chờ ngày hẹn', 'Đến cuộc hẹn', 'Đang tiến hành', 'Đã hoàn thành'];

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const parseDate = (dateString: any) => {
      const [datePart, timePart] = dateString.split(' - ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    setSelectedDate(parseDate(order.scheduledTime));
  }, [order.scheduledTime]);

  // Hàm định dạng ngày tháng
  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    const currentStatusIndex = statusSteps.indexOf(order.status);

  };

  // Xử lý xác nhận thay đổi
  const handleConfirm = () => {
    const currentIndex = statusSteps.indexOf(order.status);
    const nextStatus = statusSteps[currentIndex + 1];

    setOrder(prev => ({
      ...prev,
      status: nextStatus,
      scheduledTime: formatDate(selectedDate),
    }));

    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Thông tin đơn hàng</Text>
      </View>
      <Text style={styles.statusOrder}>Cuộc hẹn trước</Text>

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
            <Text style={styles.status}>
              <MaterialCommunityIcons name="motorbike" size={24} color="#25923E" />
              {order.status}
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}>Thời gian hẹn:</Text>
          <Text style={styles.value}>{orderDetails.scheduledTime}</Text>
        </View>

        {/* Modal thay đổi lịch hẹn */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thay đổi lịch hẹn</Text>
            
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

      <View style={styles.cardinfo}>
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

      {/* Thay thế nút "Quay lại" bằng card "Lưu ý của khách hàng" */}
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
  headerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#696969',
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 5,
  },
  status: {
    color: '#25923E',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 13,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#25923E',
    flexDirection: 'row'
  },
  carddetail: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#e63946',
  },
  cardinfo: {
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    marginBottom: 40
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#25923E',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#e63946',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});