import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import WelcomeUser from "@/components/HomeSceen/WelcomeUser";
import Category from "@/components/HomeSceen/Category";
import Banner from "@/components/HomeSceen/Banner";
import Suggestion from "@/components/HomeSceen/Suggestion";
import Location from "@/components/HomeSceen/Location";
import NewShop from "@/components/HomeSceen/NewShop";

const data = [
  { key: "Banner", component: <Banner /> },
  { key: "Category", component: <Category /> },
  { key: "Suggestion", component: <Suggestion /> },
  { key: "Location", component: <Location /> },
  { key: "NewShop", component: <NewShop /> },
];

export default function Home() {
  const renderItem = ({ item }: { item: { component: JSX.Element } }) => (
    <View>{item.component}</View>
  );

  return (
    <View style={styles.container}>
      <WelcomeUser />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
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
