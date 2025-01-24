import { View, ScrollView, FlatList } from "react-native";
import React from "react";
import ProfileShop from "@/components/ShopScreen/profile/ProfileShop";

export default function profile() {
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
