// import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import RNPickerSelect from "react-native-picker-select";
// import React, { useState, useEffect } from "react";

// const Address = () => {
//   const router = useRouter();

//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);

//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedProvinceName, setSelectedProvinceName] = useState("");

//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedDistrictName, setSelectedDistrictName] = useState("");

//   const [selectedWard, setSelectedWard] = useState(null);
//   const [selectedWardName, setSelectedWardName] = useState("");

//   const [fullStreet, setFullStreet] = useState(""); // Gộp Số nhà + Tên đường

//   useEffect(() => {
//     fetch("https://provinces.open-api.vn/api/?depth=1")
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedData = data.map((item) => ({
//           label: item.name,
//           value: item.code,
//           name: item.name,
//         }));
//         setProvinces(formattedData);
//       })
//       .catch((error) => console.error("Lỗi tải dữ liệu:", error));
//   }, []);

//   useEffect(() => {
//     if (selectedProvince) {
//       fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
//         .then((response) => response.json())
//         .then((data) => {
//           const formattedData = data.districts.map((item) => ({
//             label: item.name,
//             value: item.code,
//             name: item.name,
//           }));
//           setDistricts(formattedData);
//           setWards([]);
//           setSelectedDistrict(null);
//           setSelectedWard(null);
//         })
//         .catch((error) => console.error("Lỗi tải dữ liệu quận/huyện:", error));
//     }
//   }, [selectedProvince]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
//         .then((response) => response.json())
//         .then((data) => {
//           const formattedData = data.wards.map((item) => ({
//             label: item.name,
//             value: item.code,
//             name: item.name,
//           }));
//           setWards(formattedData);
//           setSelectedWard(null);
//         })
//         .catch((error) => console.error("Lỗi tải dữ liệu phường/xã:", error));
//     }
//   }, [selectedDistrict]);

//   const fullAddress = `${fullStreet ? fullStreet + ", " : ""}${
//     selectedWardName ? selectedWardName + ", " : ""
//   }${
//     selectedDistrictName ? selectedDistrictName + ", " : ""
//   }${selectedProvinceName}`;

//   const handleConfirmAddress = () => {
//     if (!fullStreet.trim()) {
//       Alert.alert("Lỗi", "Vui lòng nhập Số nhà và Tên đường.");
//       return;
//     }
//     if (!selectedProvince || !selectedDistrict || !selectedWard) {
//       Alert.alert("Lỗi", "Vui lòng chọn đầy đủ Tỉnh, Quận và Phường.");
//       return;
//     }

//     router.push({
//       pathname: "/Order/OrderCustomer",
//       params: { address: fullAddress },
//     });
//   };

//   const handleCancel = () => {
//     router.back(); // Quay lại trang trước
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>
//         Số nhà & Tên đường <Text style={{ color: "red" }}>*</Text>:
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập số nhà, tên đường"
//         value={fullStreet}
//         onChangeText={setFullStreet}
//       />

//       <Text style={styles.label}>
//         Tỉnh/Thành phố <Text style={{ color: "red" }}>*</Text>:
//       </Text>
//       <RNPickerSelect
//         onValueChange={(value, index) => {
//           setSelectedProvince(value);
//           setSelectedProvinceName(provinces[index - 1]?.name || "");
//         }}
//         items={provinces}
//         placeholder={{ label: "Chọn tỉnh/thành phố", value: null }}
//       />

//       <Text style={styles.label}>
//         Quận/Huyện <Text style={{ color: "red" }}>*</Text>:
//       </Text>
//       <RNPickerSelect
//         onValueChange={(value, index) => {
//           setSelectedDistrict(value);
//           setSelectedDistrictName(districts[index - 1]?.name || "");
//         }}
//         items={districts}
//         placeholder={{ label: "Chọn quận/huyện", value: null }}
//         disabled={!selectedProvince}
//       />

//       <Text style={styles.label}>
//         Phường/Xã <Text style={{ color: "red" }}>*</Text>:
//       </Text>
//       <RNPickerSelect
//         onValueChange={(value, index) => {
//           setSelectedWard(value);
//           setSelectedWardName(wards[index - 1]?.name || "");
//         }}
//         items={wards}
//         placeholder={{ label: "Chọn phường/xã", value: null }}
//         disabled={!selectedDistrict}
//       />

//       <Text style={styles.label}>📍 Địa chỉ đầy đủ:</Text>
//       <View style={styles.addressBox}>
//         <Text style={styles.result}>{fullAddress || "Chưa có địa chỉ"}</Text>
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Hủy" color="red" onPress={handleCancel} />
//         <Button title="Xác nhận địa chỉ" onPress={handleConfirmAddress} />
//       </View>
//     </View>
//   );
// };

// export default Address;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   addressBox: {
//     borderWidth: 1,
//     borderColor: "#007bff",
//     backgroundColor: "#f0f8ff",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   result: {
//     fontSize: 16,
//     color: "#333",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
// });
import { Text, View } from "react-native";
import React, { Component } from "react";

export class Address extends Component {
  render() {
    return (
      <View>
        <Text>Address</Text>
      </View>
    );
  }
}

export default Address;
