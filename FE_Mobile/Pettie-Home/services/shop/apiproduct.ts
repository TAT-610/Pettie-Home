import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Products } from "@/services/types";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getProductsByShop = async (pageNumber = 1, pageSize = 10) => {
  try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
          throw new Error("Access token is not found");
      }

      const response = await axios.get(`${BASE_URL_2}/products/shop`, {
          params: { pageNumber, pageSize },
          headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json"
          }
      });

      console.log("get product by shop data:", response.data); // Check the response structure

      if (response.data.success) {
          if (response.data) {
              return response.data.data.items; // Ensure this returns an object with products array
          } else {
              throw new Error("Dữ liệu sản phẩm không hợp lệ.");
          }
      } else {
          throw new Error(response.data.message || "Failed to fetch products");
      }
  } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
  }
};

// Tạo sản phẩm mới
export const createProduct = async (productData: Partial<Products>): Promise<any> => {
  try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
          throw new Error("Access token is missing. Please log in again.");
      }

      // Tạo FormData
      const formData = new FormData();
      formData.append("name", productData.name || "");
      formData.append("price", productData.price?.toString() || "0");
      formData.append("stock", productData.stock?.toString() || "0");
      formData.append("categoryId", productData.categoryId || "");
      formData.append("brand", productData.brand || "");
      formData.append("description", productData.description || "");
      formData.append("expiry", productData.expiry || "");

      // Kiểm tra nếu có ảnh thì thêm vào FormData
      if (productData.image && typeof productData.image === "object" && "uri" in productData.image) {
          formData.append("image", {
              uri: productData.image.uri,
              type: productData.image.type,
              name: productData.image.fileName || "image.jpg",
          } as any); // TypeScript có thể cần `as any` để tránh lỗi kiểu dữ liệu
      }

      console.log("FormData Sent:", formData);

      const response = await axios.post(`${BASE_URL_2}/products`, formData, {
          headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
          },
      });

      console.log("Product Created Successfully:", response.data);
      return response.data;
  } catch (error: any) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      throw error;
  }
};

// Lấy thông tin sản phẩm theo id
export const getProductById = async (id: string): Promise<Products | null> => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Access token is not found");
      }
  
      const response = await axios.get(`${BASE_URL_2}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("get product by id data:", response.data); // Check the response structure
  
      if (response.data.success) {
        return response.data.data || null; // Return the product data if success
      } else {
        throw new Error(response.data.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product by id:", error);
      throw error;
    }
  };
  
  export const editProductById = async (id: string, productData: Partial<Products>): Promise<any> => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Access token is not found");
      }
  
      // Tạo FormData
      const formData = new FormData();
  
      // Thêm các trường dữ liệu vào FormData
      if (productData.name) formData.append("name", productData.name);
      if (productData.price !== undefined) formData.append("price", productData.price.toString());
      if (productData.stock !== undefined) formData.append("stock", productData.stock.toString());
      if (productData.categoryId) formData.append("categoryId", productData.categoryId);
      if (productData.brand) formData.append("brand", productData.brand);
      if (productData.description) formData.append("description", productData.description);
      if (productData.expiry) formData.append("expiry", productData.expiry);
  
      // Thêm ảnh vào FormData nếu có
      if (productData.image && typeof productData.image === "object" && "uri" in productData.image) {
        formData.append("image", {
          uri: productData.image.uri,
          type: productData.image.type || "image/jpeg", // Mặc định là JPEG nếu không có type
          name: productData.image.fileName || "image.jpg",
        } as any);
      }
  
      // Log dữ liệu gửi đi
      console.log("🚀 FormData gửi đi:");
      //@ts-ignore
      formData._parts.forEach((part) => {
        console.log(`${part[0]}:`, part[1]);
      });
  
      // Gửi request PATCH
      const response = await axios.patch(`${BASE_URL_2}/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("✅ Product Edited Successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi khi chỉnh sửa sản phẩm:", error);
      throw error;
    }
  };
  
  export const getAllCategories = async (): Promise<any[]> => {
    const accessToken = AsyncStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có access_token");
  
    try {
      const response = await axios.get(`${BASE_URL_2}/categories`, {
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
  
