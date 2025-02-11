import axios from "axios";
import { CatService, DogService, Order, Profile } from "@/services/types";

// Đặt base URL cho mock API
const BASE_URL_1 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/editProfile";
const BASE_URL_2 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/orders";
const BASE_URL_3 = "https://67ab082665ab088ea7e85901.mockapi.io/sevicesDog";
const BASE_URL_4 = "https://67ab082665ab088ea7e85901.mockapi.io/servicesCat";

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

// Lấy danh sách dịch vụ chó từ API
export const getDogServices = async (): Promise<DogService[]> => {
  try {
    const response = await axios.get<DogService[]>(BASE_URL_3);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ chó:", error);
    throw error;
  }
};

// Lấy danh sách dịch vụ chó từ API
export const getCatServices = async (): Promise<CatService[]> => {
  try {
    const response = await axios.get<CatService[]>(BASE_URL_4);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ chó:", error);
    throw error;
  }
};

// Lấy thông tin dịch vụ theo ID
export const getPetServiceById = async (type: "dog" | "cat", id: string) => {
  try {
    const BASE_URL = type === "dog" ? BASE_URL_3 : BASE_URL_4;
    console.log(`Fetching service from ${BASE_URL}/${id}`); // Kiểm tra URL API
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Lỗi khi lấy thông tin dịch vụ ${type} với ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};



