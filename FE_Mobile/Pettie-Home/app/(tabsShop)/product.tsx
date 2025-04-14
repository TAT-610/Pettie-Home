import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ProductShop from "@/components/ShopScreen/product/ProductShop";

export default function home() {
  return (
    <FlatList
      style={{ backgroundColor: "#e9f1ff" }}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View>
            <ProductShop />
          </View>
        </>
      )}
    />
  );
}
