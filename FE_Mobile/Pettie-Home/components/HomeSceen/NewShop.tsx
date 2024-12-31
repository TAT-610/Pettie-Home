import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function NewShop() {
  return (
    <View style={styles.container}>
      <View style={styles.contentheader}>
        <Text style={styles.header}>Khám phá bạn mới :</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="gray"
          style={{ marginRight: 14, marginTop: 10 }}
        />
      </View>
      <View style={styles.itemshop}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/de/23/10/de2310e8894dc8ede2694c110e3764ba.jpg",
          }}
          style={styles.shopImage}
        />
        <View style={styles.contentshop}>
          <View>
            <Text style={styles.NameShop}>Name Shop</Text>
            <Text
              style={styles.shopDescription}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Giới thiệu: Shop Quin quin chuyên cung cấp các dịch vụ, sản phẩm
              chất lượng cao cho thú cưng của bạn....
            </Text>
          </View>
          <View style={styles.detailShop}>
            <Text style={styles.detailitem}>
              <AntDesign name="star" size={15} color="#ecc41c" />
              4.5
            </Text>
            <View>
              <Text style={styles.detailitem}>
                <Octicons name="location" size={14} color="#FE5977" />
                10km
              </Text>
            </View>

            <Text style={styles.detailitem2}>
              <MaterialIcons name="pets" size={15} color="#00bf63" />
              New
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20, // Cách đều màn hình 20px
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
  },
  shopImage: {
    width: 120,
    height: 115,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemshop: {
    flexDirection: "row",
    marginBottom: 10,
  },
  contentshop: {
    marginLeft: 15,
    height: 115,
    flex: 1,
  },
  NameShop: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  shopDescription: {
    fontSize: 12,
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
