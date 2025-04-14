import axios from "axios";

const BASE_URL = "http://14.225.198.232:8080/api/v1";

// Lấy danh sách danh mục
interface Category {
  id: string;
  name: string;
  description: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Chưa có access_token");

  try {
    const response = await axios.get<{ data: { items: Category[] } }>(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data.items || [];
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    return [];
  }
};

// Thêm danh mục mới
export const addCategory = async (category: { name: string; description: string }): Promise<any> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Chưa có access_token");

  try {
    // Tạo tên danh mục mới để tránh trùng
    const uniqueName = `${category.name} (${new Date().getTime()})`;

    console.log("Gửi request tạo danh mục:", uniqueName);
    const response = await axios.post(`${BASE_URL}/categories`, { 
      name: uniqueName, 
      description: category.description 
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi thêm danh mục:", error.response?.data || error.message);
    throw error;
  }
};

  

// Lấy danh mục theo ID
export const getCategoryById = async (id: string): Promise<any> => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có access_token");
  
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy danh mục theo ID:", error);
      throw error;
    }
  };
  
  // Cập nhật danh mục
  export const updateCategory = async (id: string, category: { name: string; description: string }): Promise<any> => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có access_token");
  
    try {
      console.log(`Cập nhật danh mục ID: ${id}`, category);
      const response = await axios.patch(`${BASE_URL}/categories/${id}`, category, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Phản hồi từ server:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi cập nhật danh mục:", error.response?.data || error.message);
      throw error;
    }
  };
  
  
  // Xóa danh mục
  export const deleteCategory = async (id: string): Promise<void> => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có access_token");
  
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Lỗi xóa danh mục:", error);
      throw error;
    }
  };