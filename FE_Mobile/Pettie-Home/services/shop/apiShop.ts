import axios from "axios";
import { Shop } from "../types"; 

const BASE_URL = "http://14.225.198.232:8080/api/v1";

export const getShops = async (search = "", pageNumber = 1, pageSize = 10): Promise<Shop[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/shops?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Shop thanh cong"); 

    if (response.data.success && response.data.data) {
      return response.data.data.items.map((shop: any) => ({
        id: shop.id,
        name: shop.name,
        imageUrl:
        shop.imageUrl ||
        (shop.imageFileName
          ? `${BASE_URL}/uploads/${shop.imageFileName}` // Đường dẫn file local
          : "https://i.pinimg.com/736x/7f/78/37/7f783761231551f96aadbaece6e7e1d9.jpg"),
        totalRating: shop.averageRating || 0,
        description: shop.description || "Chưa có mô tả",
      }));
    } else {
      throw new Error("Dữ liệu cửa hàng không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách cửa hàng:", error);
    throw error;
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
