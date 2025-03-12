import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { getServiceById } from "../../services/shop/apiService";
import { addToCart } from "../../services/user/cart";

const ServiceDetail = () => {
  const { serviceId } = useLocalSearchParams();
  const { shopId } = useLocalSearchParams();
  const router = useRouter();
  const [service, setService] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const serviceData = await getServiceById(serviceId as string);
        setService(serviceData);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết dịch vụ:", error);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (!service) {
    return <Text>Loading...</Text>;
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Tính tổng tiền
  const totalPrice = service.price * quantity;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>ID dịch vụ: {serviceId}</Text> */}
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.back()}
          style={styles.backButton}
        />

        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>
      <View>
        <View style={{ height: "40%" }}>
          <Image
            source={{
              uri: service.image
                ? `https://pettiehome.online/web/${service.image}`
                : `https://pettiehome.online/web/${service.imageFileName}`,
            }}
            resizeMode="cover"
            style={styles.serviceerviceImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.price}>{service.price}.000 VNĐ</Text>
        </View>
        <View style={{ backgroundColor: "#e9f1ff", height: "1%" }}></View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Mô tả dịch vụ:</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
          >
            <AntDesign name="minussquare" size={30} color="#ed7c44" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <AntDesign name="plussquare" size={30} color="#ed7c44" />
          </TouchableOpacity>
        </View>
        <View style={styles.bookingContainer}>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => {
              console.log(`Thêm ${quantity} dịch vụ vào giỏ`);
              addToCart(shopId as string, serviceId as string, null, quantity);
              router.push(`/ViewShop/${shopId}`);
            }}
          >
            <Text style={styles.bookingButtonText}>
              Đặt dịch vụ - {totalPrice}.000 VNĐ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  text: {
    fontSize: 10,
    fontWeight: "500",
  },
  navigation: {
    justifyContent: "space-between",
    height: 80, // Fixed height for the navigation bar
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    paddingHorizontal: 10, // Horizontal padding
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it is above other content

    backgroundColor: "none",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    marginRight: 10, // Space between button and title
    borderRadius: 100,
  },
  serviceerviceImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    height: "12%",
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#ed7c44",
    fontWeight: "600",
  },
  descriptionContainer: {
    backgroundColor: "white",
    padding: 15,
    height: "25%",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "10%",
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
  bookingContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 10,
  },
  bookingButton: {
    backgroundColor: "#ed7c44",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookingButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
