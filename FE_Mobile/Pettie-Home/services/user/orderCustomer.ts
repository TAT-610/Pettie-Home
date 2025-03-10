import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "@/services/types";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const createOrder = async (orderData: Partial<Order>): Promise<any> => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Access token is not found");
      }
      const response = await axios.post(`${BASE_URL_2}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Create order response:", response.data); // Kiểm tra phản hồi từ API
  
      if (response.data.success) {
        return response.data.data; // Đảm bảo trả về thông tin đơn hàng đã tạo
      } else {
        throw new Error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
  