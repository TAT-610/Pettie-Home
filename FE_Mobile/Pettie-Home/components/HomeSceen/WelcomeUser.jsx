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
import { useRouter } from "expo-router";

export default function WelcomeUser() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search/search`);
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
      <TouchableOpacity onPress={handleSearch}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchInput}>Tìm kiếm dịch vụ, cửa hàng ...</Text>

          <Ionicons name="search" size={20} color="#699BF4" />
        </View>
      </TouchableOpacity>
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
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow cho Android
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    color: "#888",
  },
});
