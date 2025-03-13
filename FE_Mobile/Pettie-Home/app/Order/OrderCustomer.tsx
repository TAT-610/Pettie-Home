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
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getUserAccount } from "@/services/user/auth";
import { Profile } from "@/services/types";
import { getCart } from "@/services/user/cart";
import { createOrder } from "@/services/user/order";

const OrderCustomer = () => {
  const router = useRouter();
  const { address, shopId } = useLocalSearchParams();
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(0));
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const defaultAddress =
    "Tòa Bs16, 88 Phước Thiện, Khu phố 29, Quận 9, Hồ Chí Minh";
  const [userInfo, setUserInfo] = useState<Profile | null>(null);
  const [orderSummary, setOrderSummary] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserAccount();
        const data: Profile = response.data; // Lấy dữ liệu từ thuộc tính `data`
        setUserInfo(data);
        setPhoneNumber(data.phoneNumber); // Gán giá trị cho phoneNumber sau khi userInfo đã được gán
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCart(shopId as string); // Sử dụng shopId từ useLocalSearchParams
        if (cartItems) {
          setOrderSummary(cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [shopId]);

  if (!userInfo) {
    return <Text>Loading user information...</Text>;
  }

  const handleChooseAddress = () => {
    router.push("/Order/Address");
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        buyerName: userInfo.fullName,
        buyerPhone: phoneNumber,
        buyerAddress: Array.isArray(address)
          ? address[0]
          : address || defaultAddress,
        buyerEmail: userInfo.email,
        note,
        paymentMethod: paymentMethod === "VN Pay" ? "BankTransfer" : "Cash",
        appointmentDate: new Date().toISOString(),
        shopId: shopId as string,
      };

      const orderResponse = await createOrder(orderData);
      console.log("Order created successfully:", orderResponse);
      router.push(`/Order/payment`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Tính tổng tiền đơn hàng
  const calculateTotal = () => {
    return orderSummary.reduce(
      (total, item) =>
        total +
        (item.shopService?.price || item.product?.price || 0) * item.quantity,
      0
    );
  };

  const getNextThreeDays = () => {
    return Array.from({ length: 3 }, (_, index) => getFormattedDate(index));
  };

  const getAvailableTimes = () => {
    return Array.from({ length: 10 }, (_, index) => `${8 + index}:00`);
  };

  // Hàm định dạng ngày theo dd/MM
  function getFormattedDate(offset: any) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  // Xử lý khi chọn ngày
  const handleSelectDate = (date: any) => {
    setSelectedDate(date);
  };

  // Xử lý khi chọn giờ
  const handleSelectTime = (time: any) => {
    setSelectedTime(time);
    setModalVisible(false);
  };

  // Xử lý cập nhật số điện thoại
  const handleUpdatePhoneNumber = () => {
    setPhoneNumber(newPhoneNumber);
    setPhoneModalVisible(false);
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
              numColumns={3}
              key={`numColumns-${3}`}
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

      {/* Modal cập nhật số điện thoại */}
      <Modal visible={isPhoneModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại mới"
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleUpdatePhoneNumber}
            >
              <Text style={styles.closeButtonText}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPhoneModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Hủy</Text>
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
              <FontAwesome6 name="user" size={16} color="#ed7c44" /> Thông tin
              người dùng:
            </Text>
            <Text style={styles.addressText}>
              Họ và tên: {userInfo.fullName}
            </Text>
            <Text style={styles.addressText}>Email: {userInfo.email}</Text>
            <Text style={styles.addressText}>
              Số điện thoại: {userInfo.phoneNumber}
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              <FontAwesome6 name="location-dot" size={16} color="#ed7c44" /> Địa
              chỉ của bạn:
            </Text>
            <TouchableOpacity onPress={handleChooseAddress}>
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
            <TouchableOpacity onPress={() => setPhoneModalVisible(true)}>
              <Text style={styles.addressText}>{phoneNumber}</Text>
            </TouchableOpacity>
          </View>

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
            const isService =
              item.shopService && item.shopService.id !== undefined;
            const service = isService ? item.shopService : item.product;
            return (
              <View style={{ flexDirection: "row" }} key={index}>
                <View style={styles.orderSummaryItem}>
                  <Image
                    source={{
                      uri: service.image
                        ? `https://pettiehome.online/web/${service.image}`
                        : `https://pettiehome.online/web/${service.imageFileName}`,
                    }}
                    style={styles.orderImage}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.name}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {service.name}
                    </Text>

                    <View style={styles.contentcard}>
                      <View>
                        <Text style={styles.price}>{service.price} đ</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: 15, paddingTop: 12 }}>
                    <Text>x{item.quantity}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={styles.totalcontent}>
            <Text style={styles.totalText}>Tổng đơn hàng:</Text>
            <Text style={styles.totalprice2}>{calculateTotal()}đ</Text>
          </View>
          <View style={styles.totalcontent2}>
            <Text style={styles.totalText}>Phí vận chuyển:</Text>
            <Text style={styles.totalprice2}>25.000đ</Text>
          </View>
          <View style={styles.totalcontent2}>
            <Text style={styles.totalText2}>Phí thanh toán:</Text>
            <Text style={styles.totalprice3}>{calculateTotal() + 25000}đ</Text>
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
    fontWeight: "500",
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
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});

export default OrderCustomer;
