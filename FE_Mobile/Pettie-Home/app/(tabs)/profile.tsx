import { View, Text, FlatList } from "react-native";
import React from "react";
import Profile from "@/components/HomeSceen/Profile";

export default function profile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View style={{ backgroundColor: "#e9f1ff" }}>
            <Profile />
          </View>
        </>
      )}
    />
  );
}
