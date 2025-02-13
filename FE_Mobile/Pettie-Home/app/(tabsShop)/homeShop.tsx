import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ProfileShop from "@/components/ShopScreen/homeShop/ProfileShop";
export default function home() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View style={{ backgroundColor: "#f9f9f9" }}>
            <ProfileShop />
          </View>
        </>
      )}
    />
  );
}
