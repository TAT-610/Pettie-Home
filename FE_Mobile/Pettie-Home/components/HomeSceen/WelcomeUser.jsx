import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
export default function welcomeUser() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.location}>
          <FontAwesome6 name="location-dot" size={18} color="white" />
          <Text style={styles.location_text}>
            BS16, Vinhome Grand Park, ...
          </Text>
        </View>
        <View style={styles.notification}>
          <Ionicons name="notifications" size={25} color="white" />
        </View>
      </View>
      <View
        style={{
          top: 20,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 45,
          paddingHorizontal: 15,
          marginHorizontal: 15,
          borderRadius: 100,
          elevation: 5,
        }}
      >
        <FontAwesome name="search" size={16} color="gray" />
        <TextInput
          placeholder="Tìm kiếm dịch vụ, ..."
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            flex: 1,
            marginLeft: 5,
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1ed0d0",
    paddingTop: 50,
    paddingBottom: 0,
    position: "absolute", // Đặt vị trí tuyệt đối
    top: 0, // Căn trên màn hình
    left: 0,
    right: 0,
    zIndex: 10, // Đặt layer cao hơn các thành phần khác
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  location_text: {
    marginLeft: 10,
    color: "white",
    fontWeight: 700,
  },
  notification: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
