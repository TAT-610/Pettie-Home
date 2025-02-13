import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ServicesShop from "@/components/ShopScreen/product/ServicesShop";

export default function home() {
  return (
    <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={() => (
            <>
              <View style={{ backgroundColor: "#f9f9f9" }}>
                <ServicesShop />
              </View>
            </>
          )}
        />
  );
}
