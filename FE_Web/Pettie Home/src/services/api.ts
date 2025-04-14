import axios from "axios";

const BASE_URL_1 = "http://14.225.198.232:8080";
const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  // Add other fields as per the API response
}

export const loginUser = async (username: string, password: string): Promise<{ accessToken: string; userData: UserData }> => {
  console.log("Login with username:", username, "Password:", password);

  try {
    const response = await axios.post(
      `${BASE_URL_1}/connect/token`,
      new URLSearchParams({
        username,
        password,
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

    const accessToken = response.data.access_token;
    if (!accessToken) throw new Error("Không nhận được access token");

    localStorage.setItem("access_token", accessToken); // Lưu token vào localStorage

    // Gọi API lấy thông tin người dùng
    const userData = await getUserAccount();
    localStorage.setItem("user_info", JSON.stringify(userData)); // Lưu thông tin user vào localStorage

    return { accessToken, userData }; // Trả về cả token và thông tin user
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};


// Hàm lấy thông tin người dùng
export const getUserAccount = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token không tìm thấy");
      throw new Error("Access token không hợp lệ");
    }

    const response = await axios.get(`${BASE_URL_2}/account/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error);
    throw error;
  }
};


// Hàm lấy danh sách tất cả người dùng
export const getAllUser = async (page = 1, pageSize = 10): Promise<[]> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    console.error("Lỗi: Chưa có access_token");
    throw new Error("Chưa có access_token");
  }

  try {
    const response = await axios.get(
      `${BASE_URL_2}/account/users?pageNumber=${Math.max(1, page)}&pageSize=${Math.max(1, pageSize)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
      return response.data.data.items;
    } else {
      console.error("Lỗi dữ liệu API: Không tìm thấy danh sách người dùng hợp lệ", response.data);
      return [];
    }
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng:", error);
    return [];
  }
};
