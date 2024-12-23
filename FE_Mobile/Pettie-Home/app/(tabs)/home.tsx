import { View, Text, ScrollView } from "react-native";
import React from "react";
import WelcomeUser from "@/components/HomeSceen/WelcomeUser";
import Category from "@/components/HomeSceen/category";
export default function home() {
  return (
    <View>
      <WelcomeUser />
      <ScrollView>{/* <Category /> */}</ScrollView>
    </View>
  );
}
