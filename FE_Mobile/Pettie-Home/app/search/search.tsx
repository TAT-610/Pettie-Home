import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Shop } from "../../services/types"; // Import interface
import Entypo from "@expo/vector-icons/Entypo";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getShops } from "../../services/shop/apiShop";

const Search = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [shops, setShops] = useState<Shop[]>([]);

  const handleSearch = async () => {
    try {
      const results = await getShops(searchText);
      setShops(results);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm cửa hàng:", error);
    }
  };
  const handleProductPress = (shopId: string, distance: string) => {
    router.push(`/ViewShop/${shopId}?distance=${distance}`);
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]);

  return (
    <View style={{ backgroundColor: "#e9f1ff", flex: 1 }}>
      <View style={styles.container}>
        {/* Nút quay lại */}
        <AntDesign
          name="arrowleft"
          size={30}
          color="#699BF4"
          onPress={() => router.push("/(tabs)/home")}
          style={styles.backButton}
        />
        {/* Ô tìm kiếm */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Tìm kiếm dịch vụ, cửa hàng ..."
            placeholderTextColor="#888"
          />
          <View style={styles.iconContainer}>
            <Ionicons name="search" size={20} color="white" />
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={shops}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProductPress(item.id, "5 km")}
            >
              <View style={styles.item}>
                <Entypo
                  name="shop"
                  size={22}
                  color="#ed7c44"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.textitem}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,

    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "89%",
    borderRadius: 15,
    borderColor: "#699BF4",
    borderWidth: 1,
    shadowColor: "#000",

    overflow: "hidden",
    height: 40,
  },
  searchInput: {
    flex: 0.82,
    fontSize: 14,
    marginLeft: 10,
    color: "#333",
  },
  iconContainer: {
    flex: 0.18,
    backgroundColor: "#699BF4",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 100,
    width: "10%",
  },
  item: {
    flexDirection: "row",
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  textitem: {
    fontWeight: "500",
    fontSize: 15,
  },
});
