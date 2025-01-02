import { View, Text, ScrollView } from "react-native";
import React from "react";
import HomeShop from '../../components/ShopScreen/HomeShop'
export default function home() {
  return (
    <View>
      <ScrollView>
        <HomeShop />
      </ScrollView>
    </View>
  );
}
