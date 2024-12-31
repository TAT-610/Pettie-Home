import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import WelcomeUser from "@/components/HomeSceen/WelcomeUser";
import Category from "@/components/HomeSceen/Category";
import Banner from "@/components/HomeSceen/Banner";
import Suggestion from "@/components/HomeSceen/Suggestion";
import Location from "@/components/HomeSceen/Location";
import NewShop from "@/components/HomeSceen/NewShop";
export default function Home() {
  return (
    <View style={styles.container}>
      <WelcomeUser />
      <ScrollView>
        <Banner />
        <Category />
        <Suggestion />
        <Location />
        <NewShop />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ceeae7",
    backgroundColor: "#e9f1ff",
    // backgroundColor: "#daefed",
  },
});
