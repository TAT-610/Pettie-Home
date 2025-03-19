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
import React, { useState, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getServicesByShop } from "../../services/shop/apiShop";

const ServicesOfCat = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await getServicesByShop(shopId);
        const catServices = serviceData.filter(
          (service: any) => service.category.name === "Mèo"
        );
        setServices(catServices);
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ cho mèo:", error);
      }
    };

    fetchServices();
  }, [shopId]);

  const handleProductPress = (serviceId: number) => {
    router.push(`/ViewService/${serviceId}?shopId=${shopId}`);
  };

  // Hàm định dạng giá tiền
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
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
