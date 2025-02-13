import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import OrderShop from "@/components/ShopScreen/order/OrderShop";

export default function order() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View style={{ backgroundColor: "#f9f9f9" }}>
            <OrderShop />
          </View>
        </>
      )}
    />
  );
}
