import axios from "axios";

const BASE_URL_1 = "http://14.225.198.232:8080";
const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

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

    const accessToken = response.data.access_token;
    localStorage.setItem("access_token", accessToken); // Lưu token vào localStorage
    return accessToken;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả người dùng
export const getAllUser = async (page = 1, pageSize = 10): Promise<any[]> => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    console.error("Lỗi: Chưa có access_token");
    throw new Error("Chưa có access_token");
  }

  try {
    const response = await axios.get(
      `${BASE_URL_2}/account/users?pageNumber=${Math.max(1, page)}&pageSize=${Math.max(1, pageSize)}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Kiểm tra xem response.data có đúng định dạng không
    if (response.data && response.data.data && Array.isArray(response.data.data.items)) {
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

