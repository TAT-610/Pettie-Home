import axios from "axios";
import { ProfileShop } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

// export const getUserAccount = async () => {
//   try {
//     const access_token = await AsyncStorage.getItem("access_token");
//     console.log("Stored access_token:", access_token); // Kiểm tra token
//     if (!access_token) {
//       throw new Error ("Access token is not found")
//     }

//     const response = await axios.get(`${BASE_URL_2}/account/users/me`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json"
//         }
//       }
//     )
    
//     console.log("User Data: ", response.data);
    
//     return response.data;
//   } catch (error) {
//     console.error("Get User Account Error: ", error)
//     throw error;
//   }
// }

// Hàm lấy thông tin Shop 
export const getShopAccount = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(`${BASE_URL_2}/shops/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const shopId = response.data.data.id; 
    await AsyncStorage.setItem("shopId", shopId)
    console.log("Shop id saved in Async:", AsyncStorage.getItem("shopId"));
    
    console.log("Shop Data: ", response.data);

    // Lọc chỉ lấy thông tin profile của shop
    const shopProfile = {
      id: response.data.data.id,
      name: response.data.data.name,
      description: response.data.data.description,
      address: response.data.data.address,
      phone: response.data.data.phone,
      email: response.data.data.email,
      openingTime: response.data.data.openingTime,
      closingTime: response.data.data.closingTime,
      imageUrl: response.data.data.imageUrl,
    };

    console.log("Shop Profile Data: ", shopProfile);
    return shopProfile;
  } catch (error) {
    console.error("Get Shop Data Error: ", error);
    throw error;
  }
};

// Hàm cập nhật thông tin Shop theo ID
export const updateShopById = async ( updateData: Partial<ProfileShop>): Promise<ProfileShop> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }
    // Tạo FormData
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    if (updateData.name) formData.append("name", updateData.name);
    if (updateData.description) formData.append("description", updateData.description);
    if (updateData.closingTime) formData.append("closingTime", updateData.closingTime);
    if (updateData.openingTime) formData.append("openingTime", updateData.openingTime);
    if (updateData.email) formData.append("email", updateData.email);
    if (updateData.address) formData.append("address", updateData.address);
    if (updateData.phone) formData.append("phone", updateData.phone);

    // Thêm ảnh vào FormData nếu có
    if (updateData.imageUrl && typeof updateData.imageUrl === "object" && "uri" in updateData.imageUrl) {
      formData.append("image", {
        uri: updateData.imageUrl.uri,
        type: updateData.imageUrl.type || "image/jpeg", // Mặc định là JPEG nếu không có type
        name: updateData.imageUrl.fileName || "image.jpg",
      } as any);
    }

    // Log dữ liệu gửi đi
    console.log("🚀 FormData gửi đi:");
    //@ts-ignore
    formData._parts.forEach((part) => {
      console.log(`${part[0]}:`, part[1]);
    });

    // Gửi request PATCH
    const response = await axios.patch(`${BASE_URL_2}/shops`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Product Edited Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi chỉnh sửa profileShop:", error);
    throw error;
  }
};
