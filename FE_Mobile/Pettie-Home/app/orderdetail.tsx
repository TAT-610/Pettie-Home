import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import OrderDetails from "@/components/ShopScreen/order/OrderDetails";

export default function order() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View style={{ backgroundColor: "#f9f9f9" }}>
            <OrderDetails />
          </View>
        </>
      )}
    />
  );
}
