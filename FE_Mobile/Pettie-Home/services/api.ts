import axios from "axios";
import { Products, Profile } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Đặt base URL cho mock API
// const BASE_URL_1 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/users";
// const BASE_URL_2 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/products";
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
    
    console.log("User Data: ", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Get User Account Error: ", error)
    throw error;
  }
}

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
  console.log("");
  
  try {
    const response = await axios.get<Profile>(`${BASE_URL_1}/${id}`);
    console.log("getProfileById:", response);
    
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

/**
 * 🔹 Lấy danh sách tất cả cửa hàng (role = "shop")
 */
export const getAllShops = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get<Profile[]>(`${BASE_URL_1}`);
    // Manually filter users by role 'shop'
    const shops = response.data.filter(user => user.role === 'shop');
    return shops;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách cửa hàng:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * 🔹 Lấy danh sách sản phẩm theo cửa hàng (shopId)
 */
export const getAllProductsByShop = async (shopId: string, id: Profile): Promise<Products[]> => {
  if (!shopId) throw new Error("shopId không hợp lệ!");
  if (id.role !== 'shop') throw new Error("User does not have the required shop role.");
  if (id.id !== shopId) throw new Error("User is not authorized to access this shop's products.");

  try {
    const response = await axios.get<Products[]>(`${BASE_URL_2}?shopId=${shopId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Lỗi khi lấy sản phẩm của shop ${shopId}:`, error.response?.data || error.message);
    throw error;
  }
};


/**
 * 🔹 Lấy sản phẩm theo ID
 */
export const getProductById = async (productId: string): Promise<Products> => {
  if (!productId) throw new Error(" productId không hợp lệ!");

  try {
    const response = await axios.get<Products>(`${BASE_URL_2}/${productId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Lỗi khi lấy sản phẩm với ID ${productId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔹 Lấy danh sách tất cả sản phẩm
 */
export const getAllProducts = async (): Promise<Products[]> => {
  try {
    const response = await axios.get<Products[]>(BASE_URL_2);
    return response.data;
  } catch (error: any) {
    console.error(" Lỗi khi lấy danh sách sản phẩm:", error.response?.data || error.message);
    throw error;
  }
};