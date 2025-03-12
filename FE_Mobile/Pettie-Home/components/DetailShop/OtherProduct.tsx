import React, { useEffect, useState } from "react";
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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { getProductsByShop } from "../../services/shop/apiShop";

interface CatService {
  id: number;
  name: string;
  image: { uri: string; type: string; fileName: string } | null;
  price: number;
}

const OtherProduct = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProductsByShop(shopId);
      setProducts(productData);
    };

    fetchProducts();
  }, [shopId]);

  const handleProductPress = (productId: number) => {
    // router.push(`/ViewService/${serviceId}`); // Navigate to ProductDetail page
    router.push(`/ViewProduct/${productId}`);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleProductPress(item.id)}>
        <Image
          source={{
            uri: item.imageUrl
              ? `https://pettiehome.online/web/${item.imageUrl}`
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
            <Text style={styles.price}>{item.price} VND</Text>
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
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

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

export default OtherProduct;
