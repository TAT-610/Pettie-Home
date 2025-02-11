import axios from "axios";
import { Order, Profile } from "@/services/types";

// Đặt base URL cho mock API
const BASE_URL_1 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/editProfile";
const BASE_URL_2 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/orders";

// Lấy danh sách toàn bộ hồ sơ
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get<Profile[]>(BASE_URL_1);
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

// Lấy thông tin hồ sơ theo ID
export const getProfileById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL_1}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};

// Cập nhật hồ sơ
export const updateProfile = async (
  id: string,
  updatedData: Partial<Profile>
): Promise<Profile> => {
  try {
    const response = await axios.put<Profile>(`${BASE_URL_1}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating profile with ID ${id}:`, error);
    throw error;
  }
};

// Lấy danh sách đơn hàng
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(BASE_URL_2);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await axios.get<Order>(`${BASE_URL_2}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};
