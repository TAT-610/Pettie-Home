import {
  FlatList,
  FlatListComponent,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
interface CatService {
  id: number;
  name: string;
  image: string;
  price: number;
}
const CatService = [
  {
    id: 1,
    name: "Cát đậu nành Cature cho mèo 2.8kg",
    image:
      "https://paddy.vn/cdn/shop/files/Thi_tk_ch_acoten_2.png?v=1690719510",
    price: 120,
  },

  {
    id: 2,
    name: "Pate mèo kucinta gói 80g",
    image:
      "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
    price: 10,
  },
  {
    id: 3,
    name: "Bánh quy cho chó",
    image:
      "https://paddy.vn/cdn/shop/files/snack-cho-cho-banh-quy-doggyman_5.jpg?v=1732863422",
    price: 120,
  },
  {
    id: 4,
    name: "Cây cào móng chó mèo",
    image:
      "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
    price: 220,
  },
];
const OtherProduct = () => {
  const router = useRouter();
  const handleProductPress = (productId: number) => {
    // router.push(`/ViewService/${serviceId}`); // Navigate to ProductDetail page
    router.push(`/ViewProduct/${productId}`);
  };
  const renderItem = ({ item }: { item: CatService }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleProductPress(item.id)}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={styles.contentcard}>
          <View>
            <Text style={styles.price}>{item.price}.000</Text>
            <Text style={styles.detail}>Xem chi tiết</Text>
          </View>
          <Text style={styles.iconadd}>
            <Ionicons name="add-circle" size={34} color="#ed7c44" />
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>
        <FontAwesome6 name="basket-shopping" size={16} color="black" /> Các sản
        phẩm khác:
      </Text>
      <FlatList
        data={CatService}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OtherProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,

    marginBottom: 100,
    backgroundColor: "white",
  },
  tittle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    paddingTop: 20,
  },
  list: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
  },
  price: {
    fontSize: 15,

    fontWeight: "500",
    color: "#ed7c44",
  },
  detail: {
    fontSize: 12,
    color: "#888",
  },
  contentcard: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconadd: {
    alignItems: "flex-end",
  },
});
