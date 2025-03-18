import { View, Text, FlatList } from "react-native";
import React from "react";
import Profile from "@/components/HomeSceen/Profile";

export default function profile() {
  return (
    <FlatList
      data={[]}
      style={{ backgroundColor: "#e9f1ff" }}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View >
            <Profile />
          </View>
        </>
      )}
    />
  );
}
