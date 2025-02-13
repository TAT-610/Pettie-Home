import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ServiceOfDog from "./ServiceOfDog";
import ServicesOfCat from "./ServicesOfCat";
import OtherProduct from "@/components/DetailShop/OtherProduct";
const AllService = () => {
  return (
    <View style={styles.content}>
      <ServiceOfDog />
      <ServicesOfCat />
      <OtherProduct />
    </View>
  );
};

export default AllService;

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
  },
});
