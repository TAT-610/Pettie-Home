import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ProductShop from "@/components/ShopScreen/product/ProductShop";

export default function home() {
  return (
    <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={() => (
            <>
              <View style={{ backgroundColor: "#f9f9f9" }}>
                <ProductShop />
              </View>
            </>
          )}
        />
  );
}
