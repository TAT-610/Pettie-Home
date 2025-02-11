import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DogService } from "@/services/types";
import { getDogServices } from "@/services/api";

const ServiceOfDog = () => {
  const router = useRouter();
  const [services, setServices] = useState<DogService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDogServices();
        setServices(data);
      } catch (error) {
        console.error("Không thể tải dữ liệu dịch vụ chó:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductPress = (serviceId: string | number) => {
    router.push(`/ViewService/${Number(serviceId)}`); // Chuyển đổi sang số
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
          <Ionicons name="add-circle" size={34} color="#ed7c44" />
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
        <FontAwesome5 name="dog" size={16} color="black" /> Dịch vụ cho chó:
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
