import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import OtherProduct from "./OtherProduct";
import ServiceOfDog from "./ServiceOfDog";
import ServicesOfCat from "./ServicesOfCat";

const AllService = () => {
  // Danh sách các dịch vụ
  const services = [
    { id: "1", component: <ServiceOfDog /> },
    { id: "2", component: <ServicesOfCat /> },
    { id: "3", component: <OtherProduct /> },
  ];

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View>{item.component}</View>}
      contentContainerStyle={styles.content}
    />
  );
};

export default AllService;

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    paddingBottom: 20,
  },
});
