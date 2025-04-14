import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ServicesShop from "@/components/ShopScreen/product/ServicesShop";

export default function home() {
  return (
    <FlatList
      style={{ backgroundColor: "#e9f1ff" }}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View>
            <ServicesShop />
          </View>
        </>
      )}
    />
  );
}
