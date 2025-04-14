import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import { getShops } from "../../services/shop/apiShop"; // Đảm bảo import đúng
import { Shop } from "../../services/types"; // Import interface

export default function Suggestion() {
  const [shopData, setShopData] = useState<Shop[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const rawShops = await getShops();
        const formattedShops = rawShops.map((shop: any) => ({
          id: shop.id,
          name: shop.name,
          imageUrl: shop.imageUrl || shop.imageFileName || null, // Kiểm tra hình ảnh
          totalRating: shop.averageRating ?? 0,
          description: shop.description || "Chưa có mô tả",
          address: shop.address || "",
          phone: shop.phone || "",
          email: shop.email || "",
          balance: shop.balance || 0,
          bankAccountNumber: shop.bankAccountNumber || "",
          bankName: shop.bankName || "",
          bankAccountName: shop.bankAccountName || "",
          dateOfBirth: shop.dateOfBirth || null,
          openingTime: shop.openingTime || "",
          closingTime: shop.closingTime || "",
          averageRating: shop.averageRating || 0,
          distance: Math.floor(Math.random() * 12) + 1, // Giả lập khoảng cách
        }));

        // Sắp xếp cửa hàng theo rating cao nhất
        formattedShops.sort((a, b) => b.totalRating - a.totalRating);
        setShopData(formattedShops);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
      }
    };

    fetchShops();
  }, []);

  const handleProductPress = (shopId: string, distance: string) => {
    router.push(`/ViewShop/${shopId}?distance=${distance}`);
  };

  const renderItem = ({ item }: { item: Shop }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item.id, `${item.distance} km`)}
    >
      <View style={styles.shopItem}>
        <Image
          source={{
            uri: item.imageUrl
              ? `https://pettiehome.online/web/${item.imageUrl}`
              : "https://i.pinimg.com/736x/37/e0/b1/37e0b1b41ee635c1af8d1440dafde41c.jpg",
          }}
          style={styles.shopImage}
        />
        <Text style={styles.shopName} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>

        <View style={styles.contentshop}>
          <Text style={styles.shopDetails}>
            <AntDesign name="star" size={15} color="#ecc41c" />
            <Text style={styles.shopDetails2}> {item.totalRating}</Text>
          </Text>
          <Text style={styles.shopDetails}>
            <Octicons name="location" size={14} color="#FE5977" />
            <Text style={styles.shopDetails2}> {item.distance} km</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentheader}>
        <Text style={styles.header}>Đề xuất cho bạn</Text>
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
    color: "#ed7c44",
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
