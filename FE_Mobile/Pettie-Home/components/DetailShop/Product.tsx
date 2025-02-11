import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
interface Service {
  id: number;
  name: string;
  image: string;
  rate: number;
  distance: string;
  about: string;
}
const Product = () => {
  return (
    <View>
      <Text>Product</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
