import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
interface Shop {
  id: number;
  name: string;
  image: string;
  rate: number;
  distance: string;
  about: string;
}
const shopData = [
  {
    id: 1,
    name: "Pet Shop Thủ Đức",
    image:
      "https://i.pinimg.com/736x/22/45/9a/22459a91602795a4dd42ad53baa25a9f.jpg",
    rate: 4.5,
    distance: "2.3 km",
    about:
      "Chuyên Spa làm đẹp thú cưng, với kinh nghiệm 3 năm sẽ không khiên bạn thất vọng.",
  },
  {
    id: 2,
    name: "Tiệm Spa nhà Bụp",
    image:
      "https://i.pinimg.com/736x/7f/78/37/7f783761231551f96aadbaece6e7e1d9.jpg",
    rate: 4.0,
    distance: "1.8 km",
    about: "Đỉnh nóc kịch trần.",
  },
  {
    id: 3,
    name: "Thế giới thú cưng QuinQiun",
    image:
      "https://i.pinimg.com/736x/cc/7d/36/cc7d36064755b0c4b7c0eb2d46afb738.jpg",
    rate: 4.8,
    distance: "3.0 km",
    about: "Cung cấp đầy đủ các dịch vụ và sãn phẩm dành cho thú cưng",
  },
  {
    id: 4,
    name: "Juddy chuyên spa thú cưng",
    image:
      "https://i.pinimg.com/736x/ee/e7/16/eee71664f50e9de6b253c2b26621b385.jpg",
    rate: 3.9,
    distance: "2.0 km",
    about: "Cung cấp đầy đủ các dịch vụ và sãn phẩm dành cho thú cưng",
  },
  {
    id: 5,
    name: "Nhật Hùng Pet Mart",
    image:
      "https://i.pinimg.com/736x/a6/69/10/a66910ead16e4aa71a420eebcab72cf8.jpg",
    rate: 4.3,
    distance: "4.5 km",
    about: "Cung cấp đầy đủ các dịch vụ và sãn phẩm dành cho thú cưng",
  },
];
export default function NewShop() {
  const renderItem = ({ item }: { item: Shop }) => (
    <View style={styles.listcontentitem}>
      <Image source={{ uri: item.image }} style={styles.shopImage} />
      <View style={styles.contentshop}>
        <View>
          {/* Tên shop */}
          <Text style={styles.NameShop}>{item.name}</Text>
          {/* Giới thiệu shop */}
          <Text
            style={styles.shopDescription}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            Giới thiệu: {item.about}
          </Text>
        </View>
        <View style={styles.detailShop}>
          {/* Đánh giá */}
          <Text style={styles.detailitem}>
            <AntDesign name="star" size={15} color="#ecc41c" /> {item.rate}
          </Text>
          {/* Khoảng cách */}
          <Text style={styles.detailitem}>
            <Octicons name="location" size={14} color="#FE5977" />{" "}
            {item.distance}
          </Text>
          {/* Trạng thái */}
          <Text style={styles.detailitem2}>
            <MaterialIcons name="pets" size={15} color="#00bf63" /> New
          </Text>
        </View>
      </View>
    </View>
  );
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
