import {
  FlatList,
  FlatListComponent,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface CatService {
  id: number;
  name: string;
  image: string;
  price: number;
}
const CatService = [
  {
    id: 1,
    name: "Tắm cơ bản cho mèo dưới 5kg",
    image:
      "https://i.pinimg.com/736x/e1/7e/69/e17e69221a1a707186aef0f086711cd0.jpg",
    price: 120,
  },

  {
    id: 2,
    name: "Combo Spa1: Tắm + Tỉa gọn lông cho mèo",
    image:
      "https://i.pinimg.com/736x/cd/cb/6b/cdcb6b1df06746d5802c8baede2b7b49.jpg",
    price: 220,
  },
  {
    id: 3,
    name: "Combo Spa2: Tắm + Tạo kiểu cho mèo",
    image:
      "https://i.pinimg.com/736x/08/c1/16/08c116f72aaef1ba5f383cd2ad351046.jpg",
    price: 320,
  },
  {
    id: 44,
    name: "Nhuộm lông + tạo kiểu cho mèo",
    image:
      "https://i.pinimg.com/736x/31/24/29/312429037fa87a4e035002e82a1b966d.jpg",
    price: 350,
  },
];
const ServicesOfCat = () => {
  const router = useRouter();
  const handleProductPress = (serviceId: number) => {
    router.push(`/ViewService/${serviceId}`); // Navigate to ProductDetail page
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
      <Text style={styles.title}>
        <FontAwesome5 name="cat" size={16} color="black" /> Dịch vụ cho mèo:
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

export default ServicesOfCat;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    paddingTop: 10,
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
