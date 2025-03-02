import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Products } from "@/services/types";
import { Alert } from "react-native";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getProducts = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${BASE_URL_2}/products`, {
            params: {
                pageNumber,
                pageSize
            }
        });
        
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
// Tạo sản phẩm mới
export const createProduct = async (productData: Products): Promise<any> => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Access token is missing. Please log in again.");
      }
  
      console.log("Sending request to:", `${BASE_URL_2}/product`);
      console.log("Product Data:", JSON.stringify(productData, null, 2));
  
      const response = await axios.post(`${BASE_URL_2}/product`, productData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Product Created Successfully:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        Alert.alert("Lỗi", `API Error: ${error.response.status} - ${error.response.data.message}`);
      } else {
        console.error("Network or Other Error:", error.message);
        Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
      }
      throw error;
    }
  };
  
