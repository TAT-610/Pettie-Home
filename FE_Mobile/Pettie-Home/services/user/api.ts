import { Profile } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL_1 = "http://14.225.198.232:8080";
const BASE_URL_2 = "http://14.225.198.232:8080/api/v1"

export const loginUser = async (username: string, password: string): Promise<any> => {
  console.log("Login with username:", username, "Password:", password);

  try {
    const response = await axios.post(
      `${BASE_URL_1}/connect/token`,
      new URLSearchParams({
        username: username,
        password: password,
        client_id: "petshop_spa",
        scope: "openid email phone profile offline_access roles",
        grant_type: "password",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ); 
    const access_token = response.data.access_token;    
    const id_token = response.data.id_token;

    
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("id_token", id_token);
    
    // gọi hàm getUserAccount để lấy thông tin user
    const userData = await getUserAccount();
    
    console.log("API Response :", response.data);
    return { 
      access_token, 
      id_token, 
      userData 
    };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

// ham get UserAccount
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
    
    console.log("User Data ne`: ", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Get User Account Error: ", error)
    throw error;
  }
}

// Hàm đăng ký
export const registerUser = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string,
  role: "user" | "shop",
  bankName?: string, // Thêm vào, nhưng chỉ dùng nếu role là "shop"
  bankAccount?: string // Thêm vào, nhưng chỉ dùng nếu role là "shop"
): Promise<Profile> => {
  if (password !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp.");
  }

  try {
    const response = await axios.post<Profile>(`${BASE_URL_2}/auth/signup`, {
      fullName,
      email,
      phoneNumber,
      password,
      role,
      bankName: bankName || undefined, // Sử dụng undefined nếu không có giá trị
      bankAccount: bankAccount || undefined,
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    throw error;
  }
};