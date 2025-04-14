import axios from "axios";
import { Shop } from "../types"; 

const BASE_URL = "https://pettiehome.online/api/v1";

export const getShops = async (
  search = "",
  pageNumber = 1,
  pageSize = 10
): Promise<any[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/shops`, {
      headers: { "Content-Type": "application/json" },
      params: { search, pageNumber, pageSize },
    });

    if (!data.success || !data.data?.items) {
      throw new Error("Dữ liệu cửa hàng không hợp lệ.");
    }

    return data.data.items; // Trả về dữ liệu gốc từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách cửa hàng:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};


export const getShopDetails = async (shopId: string): Promise<Shop> => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Dữ liệu cửa hàng không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết cửa hàng:", error);
    throw error;
  }
};

export const getProductsByShop = async (shopId: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`);
    if (response.data.success && response.data.data) {
      return response.data.data.products;
    } else {
      throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};
export const getServicesByShop = async (shopId: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`);
    if (response.data.success && response.data.data) {
      return response.data.data.services;
    } else {
      throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};