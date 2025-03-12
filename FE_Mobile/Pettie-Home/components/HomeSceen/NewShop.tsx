import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getShops } from "../../services/shop/apiShop"; // Đảm bảo import đúng
import { Shop } from "../../services/types"; // Import interface
import { useRouter } from "expo-router";

export default function NewShop() {
  const [shopData, setShopData] = useState<Shop[]>([]);

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
        }));
        setShopData(formattedShops);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
      }
    };

    fetchShops();
  }, []);

  const router = useRouter();
  const handleProductPress = (shopId: string, distance: string) => {
    router.push(`/ViewShop/${shopId}?distance=${distance}`);
  };
  const renderItem = ({ item }: { item: Shop }) => {
    const randomDistance = Math.floor(Math.random() * 12) + 1;

    return (
      <TouchableOpacity
        onPress={() => handleProductPress(item.id, `${randomDistance} km`)}
      >
        <View style={styles.listcontentitem}>
          {/* <Image
            source={{
              uri:
                item.imageUrl || item.imageFileName
                  ? `https://pettiehome.online/web/${
                      item.imageUrl || item.imageFileName
                    }`
                  : "https://i.pinimg.com/736x/37/e0/b1/37e0b1b41ee635c1af8d1440dafde41c.jpg",
            }}
            style={styles.shopImage}
          /> */}
          <Image
            source={{
              uri: item.imageUrl
                ? `https://pettiehome.online/web/${item.imageUrl}`
                : "https://i.pinimg.com/736x/37/e0/b1/37e0b1b41ee635c1af8d1440dafde41c.jpg",
            }}
            style={styles.shopImage}
          />
          {/* <Image
            source={{
              uri: item.imageUrl
                ? `https://pettiehome.online/web/${item.imageUrl}`
                : "https://i.pinimg.com/736x/37/e0/b1/37e0b1b41ee635c1af8d1440dafde41c.jpg",
            }}
            style={styles.shopImage}
          /> */}

          <View style={styles.contentshop}>
            <View>
              <Text style={styles.NameShop}>{item.name}</Text>
              <Text
                style={styles.shopDescription}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                Giới thiệu: {item.description}
              </Text>
            </View>
            <View style={styles.detailShop}>
              <Text style={styles.detailitem}>
                <AntDesign name="star" size={15} color="#ecc41c" />{" "}
                {item.totalRating ?? "__"}
              </Text>

              <Text style={styles.detailitem}>
                <Octicons name="location" size={14} color="#FE5977" />{" "}
                {`${randomDistance} km`}
              </Text>
              <Text style={styles.detailitem2}>
                <MaterialIcons name="pets" size={15} color="#00bf63" /> New
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentheader}>
        <Text style={styles.header}>Làm quen bạn mới</Text>
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Styles không thay đổi
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "white",
    paddingBottom: 15,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  contentheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontWeight: "700",
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 15,
    color: "#ed7c44",
  },
  shopImage: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  listcontentitem: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    marginBottom: 20,
  },
  contentshop: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "stretch",
  },
  NameShop: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  shopDescription: {
    fontSize: 12.5,
    color: "#666",
    flexShrink: 1,
  },
  detailShop: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  detailitem: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  detailitem2: {
    fontSize: 12,
    color: "#00bf63",
    fontWeight: "600",
  },
});
