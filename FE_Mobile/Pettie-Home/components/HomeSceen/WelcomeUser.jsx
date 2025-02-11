import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeUser() {
  const [searchText, setSearchText] = useState(""); // Lưu nội dung trong TextInput
  const navigation = useNavigation(); // Sử dụng navigation

  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate("SearchResults", { query: searchText }); // Chuyển sang trang khác kèm nội dung
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.location}>
          <FontAwesome6 name="location-dot" size={18} color="white" />
          <Text style={styles.location_text} ellipsizeMode="tail">
            BS16, Vinhome Grand Park, ...
          </Text>
        </View>
        <View style={styles.notification}>
          <Ionicons name="notifications" size={25} color="white" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        {/* <FontAwesome name="search" size={16} color="gray" /> */}
        <TextInput
          placeholder="Tìm kiếm dịch vụ, cửa hàng ..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Tự động tìm khi nhấn Enter
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#699BF4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#699BF4",
    paddingTop: 50,
    paddingBottom: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  location_text: {
    marginLeft: 10,
    color: "white",
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  searchContainer: {
    top: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 100,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
  },
});
