import { View, Text, ScrollView } from "react-native";
import React from "react";
import WelcomeUser from "@/components/HomeSceen/WelcomeUser";
import Category from "@/components/HomeSceen/Category";
export default function home() {
  return (
    <View>
      <WelcomeUser />
      <ScrollView>
        <Category />
      </ScrollView>
    </View>
  );
}
