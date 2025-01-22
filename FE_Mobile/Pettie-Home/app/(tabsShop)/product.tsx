import { View, Text, ScrollView } from "react-native";
import React from "react";
import ProductShop from "@/components/ShopScreen/ProductShop";

export default function home() {
  return (
    <View>
      <ScrollView>
        <ProductShop />
      </ScrollView>
    </View>
  );
}
