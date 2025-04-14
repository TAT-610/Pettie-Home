import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import OrderShop from "@/components/ShopScreen/order/OrderShop";

export default function order() {
  return (
    <FlatList
    style={{backgroundColor: "#e9f1ff"}}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View >
            <OrderShop />
          </View>
        </>
      )}
    />
  );
}
