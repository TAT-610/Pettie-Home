import axios from "axios";
import { Products, Profile } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Đặt base URL cho mock API
const BASE_URL_1 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/users";
const BASE_URL_2 = "https://67a8ae906e9548e44fc1b8a3.mockapi.io/products";

// Hàm đăng nhập
export const loginUser = async (phone: string, password: string): Promise<Profile> => {
  console.log("Login with Phone is: ", { phone }, "and Password is:", { password });
  console.log(`Requesting: ${BASE_URL_1}?phone=${phone}`);

  try {
    console.log("Send Req Api");

    const response = await axios.get<Profile[]>(`${BASE_URL_1}?phone=${phone}`);
    console.log("API Response:", response.data);

    

    if (response.data.length === 0) {
      throw new Error("Tên đăng nhập không tồn tại");
    }

    // Kiểm tra mật khẩu thủ công
    const user = response.data.find(user => user.password === password);
    if (!user) {
      throw new Error("Mật khẩu không đúng");
    }
    // luu id:
    const id = user.id;
    console.log("ID login", id);
    await AsyncStorage.setItem("idUser", id)

    
    // luu role
    const role = user.role;
    console.log("User Role: ", role);

    if (role === 'user') {
      await AsyncStorage.setItem("roleUser", role)
    } else {
      // viet them ham khac nen co them role moi
      await AsyncStorage.setItem("roleShop", role)
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