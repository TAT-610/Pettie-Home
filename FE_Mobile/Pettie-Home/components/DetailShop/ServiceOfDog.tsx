import {
  FlatList,
  Image,
  StyleSheet,
  FlatListComponent,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface DogService {
  id: number;
  name: string;
  image: string;
  price: number;
}
const DogService = [
  {
    id: 1,
    name: "Tắm cơ bản cho chó < 4kg",
    image:
      "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
    price: 100,
  },
  {
    id: 2,
    name: "Tắm cơ bản cho chó 4-8kg",
    image:
      "https://i.pinimg.com/736x/7d/d8/80/7dd8806961628e384c8400a3a130d305.jpg",
    price: 150,
  },
  {
    id: 3,
    name: "Tắm cơ bản cho chó 8-12kg",
    image:
      "https://i.pinimg.com/736x/74/7b/66/747b6687dc5cb1dbf6871ac7c78e43ee.jpg",
    price: 200,
  },
  {
    id: 4,
    name: "Tắm cơ bản cho chó lớn hơn 12kg",
    image:
      "https://i.pinimg.com/736x/ca/31/26/ca3126a64fa64144a0bcad082d907d33.jpg",
    price: 250,
  },
  {
    id: 5,
    name: "Combo Spa 1: Tắm + Cắt tỉa gọn cho chó (<4kg) ",
    image:
      "https://i.pinimg.com/736x/04/6c/a0/046ca0dc65a40a0bd9977c45eadea23a.jpg",
    price: 180,
  },
  {
    id: 6,
    name: "Combo Spa 2: Tắm + Cắt tỉa tạo kiểu cho chó (<4kg) ",
    image:
      "https://i.pinimg.com/736x/ff/18/b7/ff18b74815587fc62b8598a8d578e434.jpg",
    price: 220,
  },
  {
    id: 7,
    name: "Combo Spa 3: Tắm + Cạo lông chó (<4kg) ",
    image:
      "https://peticon.edu.vn/wp-content/uploads/2023/05/cao-long-cho.jpeg",
    price: 180,
  },
  {
    id: 8,
    name: "Combo Spa 1: Tắm + Cạo lông chó (4-9kg) ",
    image:
      "https://i.pinimg.com/736x/02/3e/4a/023e4a4f882cc136fa10b91cea69ae32.jpg",
    price: 220,
  },
];

const ServiceOfDog = () => {
  const router = useRouter();

  const handleProductPress = (serviceId: number) => {
    router.push(`/ViewService/${serviceId}`); // Navigate to ProductDetail page
  };

  const renderItem = ({ item }: { item: DogService }) => (
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
            <TouchableOpacity onPress={() => handleProductPress(item.id)}>
              <Text style={styles.detail}>Xem chi tiết</Text>
            </TouchableOpacity>
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
        <FontAwesome5 name="dog" size={16} color="black" /> Dịch vụ cho chó:
      </Text>
      <FlatList
        data={DogService}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ServiceOfDog;

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
    paddingBottom: 20,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconadd: {
    alignItems: "flex-end",
  },
});
