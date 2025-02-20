import { View, Text } from "react-native";
import React from "react";
import OrderCustomer from "@/components/ManagerOrder/OrderCustomer";
export default function appointment() {
  return (
    <View style={{ flex: 1, backgroundColor: "#e9f1ff" }}>
      <OrderCustomer />
    </View>
  );
}
