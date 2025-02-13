import axios from "axios";
import { Profile } from "@/services/types";

// Đặt base URL cho mock API
const BASE_URL_1 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/users";

// Hàm đăng nhập
export const loginUser = async (userName: string, password: string): Promise<Profile> => {
  console.log("Login with Username is: ", { userName }, "and Password is:", { password });
  console.log(`Requesting: ${BASE_URL_1}?username=${userName}`);

  try {
    console.log("Send Req Api");

    const response = await axios.get<Profile[]>(`${BASE_URL_1}?userName=${userName}`);
    console.log("API Response:", response.data);



    if (response.data.length === 0) {
      throw new Error("Tên đăng nhập không tồn tại");
    }

    // Kiểm tra mật khẩu thủ công
    const user = response.data.find(user => user.password === password);
    if (!user) {
      throw new Error("Mật khẩu không đúng");
    }

    return user;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

// Hàm đăng ký
export const registerUser = async (
  userName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string,
  role: "user" | "shop"
): Promise<Profile> => {
  if (password !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp.");
  }

  try {
    const response = await axios.post<Profile>(BASE_URL_1, {
      userName,
      phoneNumber,
      password,
      role,
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    throw error;
  }
};

// Hàm lấy danh sách hồ sơ
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get<Profile[]>(BASE_URL_1);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách hồ sơ:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy hồ sơ theo ID
export const getProfileById = async (id: string): Promise<Profile> => {
  try {
    const response = await axios.get<Profile>(`${BASE_URL_1}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Lỗi khi lấy hồ sơ với ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Hàm update ho so theo ID
export const updateProfile = async (id: string, updatedData: Partial<Profile>): Promise<Profile> => {
  try {
    const response = await axios.put<Profile>(`${BASE_URL_1}/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error(`Lỗi khi cập nhật hồ sơ ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};





