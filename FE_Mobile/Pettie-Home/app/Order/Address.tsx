import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Address = () => {
  const router = useRouter();
  const { shopId } = useLocalSearchParams();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedWardName, setSelectedWardName] = useState("");

  const [fullStreet, setFullStreet] = useState("");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          label: item.name,
          value: item.code,
          name: item.name,
        }));
        setProvinces(formattedData);
      })
      .catch((error) => console.error("Lỗi tải dữ liệu:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.districts.map((item: any) => ({
            label: item.name,
            value: item.code,
            name: item.name,
          }));
          setDistricts(formattedData);
          setWards([]);
          setSelectedDistrict(null);
          setSelectedWard(null);
        })
        .catch((error) => console.error("Lỗi tải dữ liệu quận/huyện:", error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.wards.map((item: any) => ({
            label: item.name,
            value: item.code,
            name: item.name,
          }));
          setWards(formattedData);
          setSelectedWard(null);
        })
        .catch((error) => console.error("Lỗi tải dữ liệu phường/xã:", error));
    }
  }, [selectedDistrict]);

  const fullAddress = `${fullStreet ? fullStreet + ", " : ""}${
    selectedWardName ? selectedWardName + ", " : ""
  }${
    selectedDistrictName ? selectedDistrictName + ", " : ""
  }${selectedProvinceName}`;

  const handleConfirmAddress = () => {
    if (!fullStreet.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập Số nhà và Tên đường.");
      return;
    }
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      Alert.alert("Lỗi", "Vui lòng chọn đầy đủ Tỉnh, Quận và Phường.");
      return;
    }

    router.push({
      pathname: "/Order/OrderCustomer",
      params: { shopId, address: fullAddress },
    });
  };

  const handleCancel = () => {
    router.back(); // Quay lại trang trước
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="white"
          onPress={() => router.push(`/Order/OrderCustomer?shopId=${shopId}`)}
          style={styles.backButton}
        />
        <Text style={styles.textpay}>Cập nhật địa chỉ</Text>
        <Feather
          name="more-vertical"
          size={27}
          color="white"
          style={styles.backButton}
        />
      </View>
      <View style={{ padding: 20, height: "auto" }}>
        <Text style={styles.label}>
          Tỉnh/Thành phố <Text style={{ color: "red" }}>*</Text>:
        </Text>
        <RNPickerSelect
          onValueChange={(value, index) => {
            setSelectedProvince(value);
            setSelectedProvinceName(provinces[index - 1]?.name || "");
          }}
          items={provinces}
          placeholder={{ label: "Chọn tỉnh/thành phố", value: null }}
        />

        <Text style={styles.label}>
          Quận/Huyện <Text style={{ color: "red" }}>*</Text>:
        </Text>
        <RNPickerSelect
          onValueChange={(value, index) => {
            setSelectedDistrict(value);
            setSelectedDistrictName(districts[index - 1]?.name || "");
          }}
          items={districts}
          placeholder={{ label: "Chọn quận/huyện", value: null }}
          disabled={!selectedProvince}
        />

        <Text style={styles.label}>
          Phường/Xã <Text style={{ color: "red" }}>*</Text>:
        </Text>
        <RNPickerSelect
          onValueChange={(value, index) => {
            setSelectedWard(value);
            setSelectedWardName(wards[index - 1]?.name || "");
          }}
          items={wards}
          placeholder={{ label: "Chọn phường/xã", value: null }}
          disabled={!selectedDistrict}
        />
        <Text style={styles.label}>
          Số nhà & Tên đường <Text style={{ color: "red" }}>*</Text>:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số nhà, tên đường"
          value={fullStreet}
          onChangeText={setFullStreet}
        />

        <Text style={styles.label2}>
          <FontAwesome6 name="location-dot" size={15} color="#ed7c44" /> Địa chỉ
          đầy đủ:
        </Text>
        <View style={styles.addressBox}>
          <Text style={styles.result}>{fullAddress || "Chưa có địa chỉ"}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancel}>Hủy thay đổi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirmAddress}>
            <Text style={styles.check}>Xác nhận cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  label2: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  addressBox: {
    borderWidth: 1,
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  result: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
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
  textpay: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    paddingTop: 20,
    color: "white",
  },
  cancel: {
    backgroundColor: "#ed7c44",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 8,
    color: "white",
    fontWeight: "700",
  },
  check: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 8,
    color: "#ed7c44",
    fontWeight: "700",
    borderColor: "#ed7c44",
    borderWidth: 2,
  },
});
