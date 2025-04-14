import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ProfileShop from "@/components/ShopScreen/homeShop/ProfileShop";
export default function home() {
  return (
    <FlatList
    style={{backgroundColor: "#e9f1ff"}}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View>
            <ProfileShop />
          </View>
        </>
      )}
    />
  );
}
