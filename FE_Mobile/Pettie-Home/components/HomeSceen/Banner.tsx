import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import banner from "../../assets/images/banner3.jpg";
export default function Banner() {
  return (
    <View style={styles.container}>
      <Image source={banner} style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 165,
    paddingHorizontal: 15,
    backgroundColor: "#ffff",
    paddingBottom: 18,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
});
