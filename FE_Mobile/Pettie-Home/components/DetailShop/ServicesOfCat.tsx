import React, { useEffect, useState } from "react";
import {  FlatList, Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CatService } from "@/services/types";
import { getCatServices } from "@/services/api";

const ServicesOfCat = () => {
  const [services, setServices] = useState<CatService[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getCatServices();
          setServices(data);
        } catch (error) {
          console.error("Không thể tải dữ liệu dịch vụ mèo:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    const handleProductPress = (serviceId: string | number) => {
      router.push(`/ViewService/${Number(serviceId)}`); // Chuyển đổi sang số
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

  if (loading) {
    return <ActivityIndicator size="large" color="#ed7c44" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <FontAwesome5 name="cat" size={16} color="black" /> Dịch vụ cho mèo:
      </Text>
      <FlatList
        data={services}
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
