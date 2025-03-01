import axios from "axios";
import { ProfileShop } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getUserAccount = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error ("Access token is not found")
    }

    const response = await axios.get(
      `${BASE_URL_2}/account/users/me`,
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
export const getShopById = async (id: string) => { // Thêm id vào tham số
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(
      `${BASE_URL_2}/shops/${id}`, // Truyền id vào URL
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Get User Account Error: ", error);
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

    const response = await axios.patch<ProfileShop>(
      `${BASE_URL_2}/account/shops/${id}`, // Giữ nguyên logic
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
