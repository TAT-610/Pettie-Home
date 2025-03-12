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
import { getServicesByShop } from "../../services/shop/apiShop";

const ServiceOfDog = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await getServicesByShop(shopId);
        setServices(serviceData);
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ cho chó:", error);
      }
    };

    fetchServices();
  }, [shopId]);

  const handleProductPress = (serviceId: number) => {
    router.push(`/ViewService/${serviceId}`); // Navigate to ProductDetail page
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleProductPress(item.id)}>
        <Image
          source={{
            uri: item.image
              ? `https://pettiehome.online/web/${item.image}`
              : `https://pettiehome.online/web/${item.imageFileName}`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={styles.contentcard}>
          <View>
            <Text style={styles.price}>{item.price}đ</Text>
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
