import React from "react";
import { StyleSheet, View } from "react-native";
import ServiceOfDog from "./ServiceOfDog";
import ServicesOfCat from "./ServicesOfCat";
import OtherProduct from "@/components/DetailShop/OtherProduct";

const AllService = ({ shopId }: { shopId: string }) => {
  return (
    <View style={styles.content}>
      <ServiceOfDog shopId={shopId} />
      <ServicesOfCat shopId={shopId} />
      <OtherProduct shopId={shopId} />
    </View>
  );
};

export default AllService;

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
  },
});
