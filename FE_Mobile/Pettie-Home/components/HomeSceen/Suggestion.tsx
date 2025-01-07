import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import Octicons from "@expo/vector-icons/Octicons";
interface Shop {
  id: number;
  name: string;
  image: string;
  rate: number;
  distance: string;
}
const shopData = [
  {
    id: 1,
    name: "Pet Shop Thủ Đức",
    image:
      "https://i.pinimg.com/736x/a3/66/d4/a366d46152f124b245b633283f027ecf.jpg",
    rate: 4.5,
    distance: "2.3 km",
  },
  {
    id: 2,
    name: "Tiệm Spa nhà Bụp",
    image:
      "https://i.pinimg.com/736x/7f/78/37/7f783761231551f96aadbaece6e7e1d9.jpg",
    rate: 4.0,
    distance: "1.8 km",
  },
  {
    id: 3,
    name: "Thế giới thú cưng QuinQiun",
    image:
      "https://i.pinimg.com/736x/b5/e3/77/b5e377baadf2995c5ff97d9616061038.jpg",
    rate: 4.8,
    distance: "3.0 km",
  },
  {
    id: 4,
    name: "Juddy chuyên spa thú cưng",
    image:
      "https://i.pinimg.com/736x/1d/9a/22/1d9a22fab06290a3d90c08a902f5377f.jpg",
    rate: 3.9,
    distance: "2.0 km",
  },
  {
    id: 5,
    name: "Nhật Hùng Pet Mart",
    image:
      "https://i.pinimg.com/736x/1f/f4/f1/1ff4f1e627f9504d2604f47a9c475a0f.jpg",
    rate: 4.3,
    distance: "4.5 km",
  },
  {
    id: 6,
    name: "Tiệm mẹ Spa mẹ Bột",
    image:
      "https://i.pinimg.com/736x/9e/9e/0b/9e9e0b77981ba802f86393fb1c3a4dc4.jpg",
    rate: 4.6,
    distance: "1.5 km",
  },
];

export default function Suggestion() {
  const renderItem = ({ item }: { item: Shop }) => (
    <View style={styles.shopItem}>
      <Image source={{ uri: item.image }} style={styles.shopImage} />
      <Text style={styles.shopName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>

      <View style={styles.contentshop}>
        <Text style={styles.shopDetails}>
          <AntDesign name="star" size={15} color="#ecc41c" />
          <Text style={styles.shopDetails2}> {item.rate}</Text>
        </Text>
        {/* <Text>-</Text> */}
        <Text style={styles.shopDetails}>
          <Octicons name="location" size={14} color="#FE5977" />
          <Text style={styles.shopDetails2}> {item.distance}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentheader}>
        <Text style={styles.header}>Đề xuất cho bạn :</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="gray"
          style={{ marginTop: 10 }}
        />
      </View>
      <FlatList
        data={shopData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true} // Cuộn ngang
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "white",
    paddingBottom: 15,
    paddingTop: 5,
    paddingLeft: 15,
  },
  contentheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  header: {
    fontWeight: "700",
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 15,
  },
  shopItem: {
    width: 145,
    marginRight: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  shopImage: {
    width: 145,
    height: 125,
    borderRadius: 10,
    marginBottom: 10,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  contentshop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopDetails: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
    marginTop: 5,
  },
  shopDetails2: {
    fontSize: 12,

    paddingLeft: 10,
    marginTop: 5,
  },
});
