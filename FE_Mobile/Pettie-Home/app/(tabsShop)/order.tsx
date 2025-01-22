import { View, Text, ScrollView } from "react-native";
import React from "react";
import OrderShop from "@/components/ShopScreen/OrderShop";

export default function order() {
  return (
    <View>
          <ScrollView>
            <OrderShop />
          </ScrollView>
        </View>
  );
}
