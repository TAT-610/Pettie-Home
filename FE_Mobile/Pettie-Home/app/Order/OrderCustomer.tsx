import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const orderSummary = [
  {
    serviceId: 1,
    quantity: 1,
    price: 100,
    image:
      "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
  },
  {
    productId: 1,
    quantity: 2,
    price: 10,
    image:
      "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg",
  },
  {
    productId: 2,
    quantity: 1,
    price: 220,
    image:
      "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
  },
];

const DogService1 = {
  id: 1,
  name: "Tắm cơ bản cho chó < 4kg",
  image:
    "https://i.pinimg.com/736x/f7/0d/69/f70d69556578090929bc1e99da269d9f.jpg",
  price: 100,
  shopId: 2,
  description:
    "Dịch vụ tắm cơ bản dành cho chó dưới 4 kg bao gồm tỉa lông cơ bản, vệ sinh lỗ tai, cắt móng/ dũa móng, tắm bằng xà boong chuyên dụng, sấy lông, gỡ rối, đánh tơi và thoa lotion nước hoa cho chó.",
};

const Product = [
  {
    id: 1,
    name: "Pate mèo kucinta gói 80g",
    image:
      "https://paddy.vn/cdn/shop/files/z6067259275067_d00c41622820e9fd53e75b4756f44d47.jpg?v=1732539520",
    price: 10,
    rate: 4.5, // Giả sử đây là đánh giá trung bình
    brand: "Kucinta",
    description:
      "Pate Cho Mèo Kucinta Gói 80g Cao Cấp Nhập Khẩu Từ Malaysia. Quy cách đóng gói: Gói seal 80g. Thành phần: Thịt gà, Cá ngừ, Cá cơm, Cá mòi, Thanh cua. Sản phẩm cao cấp siêu thơm ngon",
    shopId: 2,
  },
  {
    id: 2,
    name: "Cây cào móng chó mèo",

    image:
      "https://paddy.vn/cdn/shop/files/6_ddd891b4-7553-4918-9472-44b03347f9ad.webp?v=1697452539",
    price: 220,
    rate: 4.5, // Giả sử đây là đánh giá trung bình
    brand: "Kucinta",
    description:
      "Pate Cho Mèo Kucinta Gói 80g Cao Cấp Nhập Khẩu Từ Malaysia. Quy cách đóng gói: Gói seal 80g. Thành phần: Thịt gà, Cá ngừ, Cá cơm, Cá mòi, Thanh cua. Sản phẩm cao cấp siêu thơm ngon",
    shopId: 2,
  },
];

const OrderCustomer = () => {
  const router = useRouter();
  const { address } = useLocalSearchParams();
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(0));
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [isModalVisible, setModalVisible] = useState(false);
  const defaultAddress =
    "Tòa Bs16, 88 Phước Thiện, Khu phố 29, Quận 9, Hồ Chí Minh";

  const handleChooseAddress = () => {
    router.push(`/Order/Address`);
  };

  const handlePlaceOrder = () => {
    router.push(`/Order/payment`);
    console.log("Đặt hàng thành công với phương thức: ", paymentMethod);
  };

  // Tính tổng tiền đơn hàng
  const calculateTotal = () => {
    return orderSummary.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  // Lấy danh sách 3 ngày liên tiếp từ hôm nay
  const getNextThreeDays = () => {
    return Array.from({ length: 3 }, (_, index) => getFormattedDate(index));
  };

  // Lấy danh sách giờ từ 8h sáng đến 5h chiều
  const getAvailableTimes = () => {
    return Array.from({ length: 10 }, (_, index) => `${8 + index}:00`);
  };

  // Hàm định dạng ngày theo dd/MM
  function getFormattedDate(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  // Xử lý khi chọn ngày
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // Xử lý khi chọn giờ
  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.push("/ViewShop/2")}
          style={styles.backButton}
        />
        <Text style={styles.textpay}>Thanh toán</Text>
        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>
      {/* Modal chọn ngày và giờ */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ngày</Text>
            <FlatList
              data={getNextThreeDays()}
              keyExtractor={(item) => item}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedDate === item && styles.selectedOption,
                  ]}
                  onPress={() => handleSelectDate(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedDate === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.modalTitle}>Chọn giờ</Text>
            <FlatList
              data={getAvailableTimes()}
              keyExtractor={(item) => item}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedTime === item && styles.selectedOption,
                  ]}
                  onPress={() => handleSelectTime(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedTime === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.scrollView}>
        {/* Địa chỉ nhận hàng */}
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            elevation: 5,
          }}
        >
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              <FontAwesome6 name="location-dot" size={16} color="#ed7c44" /> Địa
              chỉ của bạn:
            </Text>
            <TouchableOpacity
            // onPress={handleChooseAddress}
            // style={styles.addressContainer}
            >
              <Text style={styles.addressText}>
                {address || defaultAddress}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Số điện thoại */}

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              <FontAwesome5 name="phone-alt" size={16} color="#ed7c44" /> Số
              điện thoại:
            </Text>
            <Text style={styles.addressText}>0886133779</Text>
          </View>
          {/* <View style={styles.content2}>
            <Text style={styles.sectionTitle}>
              <FontAwesome6 name="calendar-check" size={16} color="#ed7c44" />{" "}
              Thời gian hẹn:
            </Text>
            <Text style={styles.addressText}>21/02/2025 - 15:00</Text>
          </View> */}
          {/* Thời gian hẹn */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              <FontAwesome6 name="calendar-check" size={16} color="#ed7c44" />{" "}
              Thời gian hẹn:
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.addressText}>
                {selectedDate}/2025 - {selectedTime}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            marginTop: 12,
            elevation: 2,
          }}
        >
          <Text style={styles.sectionTitle2}>
            <FontAwesome6 name="list-check" size={16} color="#ed7c44" /> Chi
            tiết đơn hàng:
          </Text>

          {orderSummary.map((item, index) => {
            const isService = item.serviceId !== undefined;
            const service = isService
              ? DogService1
              : Product.find((p) => p.id === item.productId);
            return (
              <View style={{ flexDirection: "row" }} key={index}>
                <View style={styles.orderSummaryItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.orderImage}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.name}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {service?.name}
                    </Text>
                    <View style={styles.contentcard}>
                      <View>
                        <Text style={styles.price}>{item.price}.000 đ</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: 15, paddingTop: 12 }}>
                  <Text>x{item.quantity}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.totalcontent}>
            <Text style={styles.totalText}>Tổng đơn hàng:</Text>
            <Text style={styles.totalprice2}>{calculateTotal()}.000đ</Text>
          </View>
          <View style={styles.totalcontent2}>
            <Text style={styles.totalText}>Phí vận chuyển:</Text>
            <Text style={styles.totalprice2}>25.000đ</Text>
          </View>
          <View style={styles.totalcontent2}>
            <Text style={styles.totalText2}>Phí vận chuyển:</Text>
            <Text style={styles.totalprice3}>{calculateTotal() + 25}.000đ</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingBottom: 12,
            marginTop: 10,
            elevation: 2,
          }}
        >
          <Text style={styles.sectionTitle}>
            <FontAwesome6 name="signal-messenger" size={16} color="#ed7c44" />{" "}
            Lưu ý cho shop:
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Nhập lời nhắn..."
            style={styles.noteInput}
          />

          <Text style={styles.sectionTitle}>
            <FontAwesome6 name="money-check-dollar" size={16} color="#ed7c44" />{" "}
            Phương thức thanh toán:
          </Text>
          <TouchableOpacity
            onPress={() => setPaymentMethod("VN Pay")}
            style={[
              styles.paymentButton,
              paymentMethod === "VN Pay" && styles.selectedPaymentButton,
            ]}
          >
            <FontAwesome
              name={paymentMethod === "VN Pay" ? "dot-circle-o" : "circle-o"}
              size={20}
              color="#ed7c44"
            />
            <Text style={{ marginLeft: 10 }}>Thanh toán VN Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPaymentMethod("Tiền mặt")}
            style={[
              styles.paymentButton,
              paymentMethod === "Tiền mặt" && styles.selectedPaymentButton,
            ]}
          >
            <FontAwesome
              name={paymentMethod === "Tiền mặt" ? "dot-circle-o" : "circle-o"}
              size={20}
              color="#ed7c44"
            />
            <Text style={{ marginLeft: 10 }}>Tiền mặt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderText}>Đặt lịch hẹn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1ff",
    paddingBottom: 50,
  },
  navigation: {
    justifyContent: "space-between",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,

    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: "#699BF4",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 100,
  },
  scrollView: {
    flex: 1,
  },
  chooseAddressButton: {
    marginBottom: 80,
  },
  chooseAddressText: {
    fontSize: 16,
    color: "blue",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
  },

  sectionTitle2: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 5,
    paddingBottom: 10,
  },
  addressText: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
    marginBottom: 5,
  },
  orderSummaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  orderImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 10,
  },
  orderSummaryText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 15,
    color: "#888",
    fontWeight: "400",
  },
  totalText2: {
    fontSize: 16.5,

    fontWeight: "500",
  },
  totalprice2: {
    fontSize: 15,
    color: "#888",
    fontWeight: "400",
  },
  totalprice3: {
    fontSize: 16.5,
    color: "#ed7c44",
    fontWeight: "600",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    marginTop: 10,
  },
  paymentButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },

  selectedPaymentButton: {
    backgroundColor: "#f0f0f0",
  },
  placeOrderButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ed7c44",
  },
  placeOrderText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  textpay: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    paddingTop: 20,
    color: "white",
  },
  content: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ffff",

    paddingBottom: 5,
  },
  content2: {
    backgroundColor: "#ffff",

    paddingBottom: 5,
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

  contentcard: {
    paddingTop: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalcontent: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 15,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  totalcontent2: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: "#ed7c44",
  },
  optionText: {
    fontSize: 14,
    color: "#000",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ed7c44",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
  },
});

export default OrderCustomer;
