import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Category = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.itemCategory}>
          <View style={styles.iconCategory}>
            <Ionicons name="location-sharp" size={24} color="white" />
          </View>
          <Text style={styles.TextCategory}>Gần bạn</Text>
        </View>
        <View style={styles.itemCategory}>
          <View style={styles.iconCategory2}>
            <MaterialCommunityIcons name="sale" size={26} color="white" />
          </View>
          <Text style={styles.TextCategory}>Sale</Text>
        </View>
        <View style={styles.itemCategory}>
          <View style={styles.iconCategory3}>
            <FontAwesome5 name="phone-alt" size={22} color="white" />
          </View>
          <Text style={styles.TextCategory}>Hotline</Text>
        </View>
        <View style={styles.itemCategory}>
          <View style={styles.iconCategory4}>
            <FontAwesome5 name="history" size={24} color="white" />
          </View>
          <Text style={styles.TextCategory}>Lịch hẹn</Text>
        </View>
      </View>
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgb(229, 235, 241)",
    backgroundColor: "white",
    paddingTop: 100,
    padding: 20,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemCategory: {
    // backgroundColor: "#FE5977", // Màu nền đỏ
    // borderRadius: 100, // Bo tròn góc
    // width: 50, // Chiều rộng của item
    // height: 50, // Chiều cao của item
    justifyContent: "center", // Căn giữa nội dung theo trục dọc
    alignItems: "center", // Căn giữa nội dung theo trục ngang
  },
  iconCategory: {
    backgroundColor: "#699BF4", // Màu nền đỏ
    borderRadius: 100, // Bo tròn góc
    width: 50, // Chiều rộng của item
    height: 50, // Chiều cao của item
    justifyContent: "center", // Căn giữa nội dung theo trục dọc
    alignItems: "center", // Căn giữa nội dung theo trục ngang
  },
  iconCategory2: {
    backgroundColor: "#FE5977", // Màu nền đỏ
    borderRadius: 100, // Bo tròn góc
    width: 50, // Chiều rộng của item
    height: 50, // Chiều cao của item
    justifyContent: "center", // Căn giữa nội dung theo trục dọc
    alignItems: "center", // Căn giữa nội dung theo trục ngang
  },
  iconCategory3: {
    backgroundColor: "#1ec2c9", // Màu nền đỏ
    borderRadius: 100, // Bo tròn góc
    width: 50, // Chiều rộng của item
    height: 50, // Chiều cao của item
    justifyContent: "center", // Căn giữa nội dung theo trục dọc
    alignItems: "center", // Căn giữa nội dung theo trục ngang
  },
  iconCategory4: {
    backgroundColor: "#ed7c44", // Màu nền đỏ
    borderRadius: 100, // Bo tròn góc
    width: 50, // Chiều rộng của item
    height: 50, // Chiều cao của item
    justifyContent: "center", // Căn giữa nội dung theo trục dọc
    alignItems: "center", // Căn giữa nội dung theo trục ngang
  },
  TextCategory: {
    marginTop: 5,
    fontWeight: 700,
    color: "gray",
    fontSize: 12,
    textAlign: "center",
  },
});
