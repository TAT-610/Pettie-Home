import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://14.225.198.232:8080/api/v1";

export const addToCart = async (
  shopId: string,
  shopServiceId: string | null,
  productId: string| null,
  quantity: number
) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.post(
      `${BASE_URL}/cart`,
      {
        shopId,
        shopServiceId,
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      console.log("Sản phẩm đã được thêm vào giỏ hàng.");
    } else {
      console.error("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
  }
};

export const getCart = async (shopId: string) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        shopId,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Không thể lấy thông tin giỏ hàng.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin giỏ hàng:", error);
    return null;
  }
};

export const deleteCart = async (cartId: string): Promise<void> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.delete(`${BASE_URL}/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("Delete order response:", response.data); // Kiểm tra phản hồi từ API
    return;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const editCart = async (cartId: string, quantity: number): Promise<any> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.patch(`${BASE_URL}/cart/${cartId}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Edit cart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing cart:", error);
    throw error;
  }
};
