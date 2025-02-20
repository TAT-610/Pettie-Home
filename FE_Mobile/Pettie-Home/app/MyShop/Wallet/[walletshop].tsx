import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const WalletShop = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Giả lập số tiền trong ví
  const [balance, setBalance] = useState(500000);

  const handleWithdrawRequest = () => {
    Alert.alert('Yêu cầu rút tiền', 'Yêu cầu rút tiền đã được gửi đi.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <AntDesign name="left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Ví Pettie Home</Text>
                </View>
      
      {/* Thông tin số dư */}
      <View style={styles.walletCard}>
        <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
        <Text style={styles.balanceText}>{balance.toLocaleString()}đ</Text>
      </View>

      {/* Nút rút tiền */}
      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawRequest}>
        <FontAwesome5 name="money-check-alt" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.withdrawButtonText}>Rút tiền</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e9f1ff',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#699BF4",
    padding: 10,
    paddingBottom: 30,
    paddingTop: 30,
},
backButton: {
    marginRight: 10,
},
header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
},
  walletCard: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 20
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ed7c44',
    marginTop: 5,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ed7c44',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    width: '40%',
    marginLeft: "30%"

  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WalletShop;
