import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Category = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>ok</Text>
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#699BF4",
    marginTop: 50,
  },
  category: {
    paddingTop: 20,
  },
});
