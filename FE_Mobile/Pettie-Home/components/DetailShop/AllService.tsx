import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Product from "./Product";
import ServiceOfDog from "./ServiceOfDog";
import ServicesOfCat from "./ServicesOfCat";
const AllService = () => {
  return (
    <View style={styles.content}>
      <ServiceOfDog />
      <ServicesOfCat />
      <Product />
    </View>
  );
};

export default AllService;

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
  },
});
