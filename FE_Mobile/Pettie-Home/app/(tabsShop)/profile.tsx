import { View, ScrollView } from "react-native";
import React from "react";
import ProfileShop from "@/components/ShopScreen/ProfileShop";

export default function profile() {
  return (
    <View>
          <ScrollView>
            <ProfileShop />
          </ScrollView>
        </View>
  );
}
