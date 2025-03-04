import axios from "axios";
import { ProfileShop } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getUserAccount = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("Stored access_token:", access_token); // Kiểm tra token
    if (!access_token) {
      throw new Error ("Access token is not found")
    }

    const response = await axios.get(`${BASE_URL_2}/account/users/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      }
    )
    
    console.log("User Data: ", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Get User Account Error: ", error)
    throw error;
  }
}

// Hàm lấy thông tin Shop theo ID
export const getShopById = async () => {
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
export const updateShopById = async (
  id: string, 
  updateData: Partial<ProfileShop>
): Promise<ProfileShop> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.patch<ProfileShop>(`${BASE_URL_2}/shops/${id}`, // Giữ nguyên logic
      updateData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cập nhật tài khoản thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    throw error;
  }
};
