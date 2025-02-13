import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const OrderCustomer = () => {
  const router = useRouter();
  const { address } = useLocalSearchParams(); // Lấy địa chỉ được truyền từ Address

  const handleChooseAddress = () => {
    router.push(`/Order/Address`);
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={handleChooseAddress}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 16, color: "blue" }}>Chọn lại địa chỉ</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        📍 Địa chỉ bạn chọn là:
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        {address || "Chưa có địa chỉ"}
      </Text>
    </View>
  );
};

export default OrderCustomer;
