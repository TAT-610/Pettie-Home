import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Service } from "@/services/types";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getServicesByShop = async (
  shopid: string,
  pageNumber = 1,
  pageSize = 100
) => {
  console.log("ShopId req", shopid);

  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(`${BASE_URL_2}/shop-services`, {
      params: { shopId: shopid, pageNumber, pageSize },
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("get dịch vụ by shop data:", response.data); // Check the response structure

    if (response.data.success) {
      // Kiểm tra cấu trúc dữ liệu trả về
      if (response.data.data && Array.isArray(response.data.data.items)) {
        return response.data.data.items; // Trả về danh sách dịch vụ
      } else {
        throw new Error("Dữ liệu dịch vụ không hợp lệ.");
      }
    } else {
      throw new Error(response.data.message || "Failed to fetch dich vu");
    }
  } catch (error) {
    console.error("Error fetching dich vu:", error);
    throw error;
  }
};

// Tạo dich vu mới
export const createServices = async (serviceData: Partial<Service>): Promise<any> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
        throw new Error("Access token is missing. Please log in again.");
    }

    // Tạo FormData
    const formData = new FormData();
    formData.append("name", serviceData.name || "");
    formData.append("price", serviceData.price?.toString() || "0");
    formData.append("categoryId", serviceData.categoryId || "");
    formData.append("description", serviceData.description || "");

    if (serviceData.image && typeof serviceData.image === "object" && "uri" in serviceData.image) {
      formData.append("image", {
          uri: serviceData.image.uri,
          type: serviceData.image.type,
          name: serviceData.image.fileName || "image.jpg",
      } as any); // TypeScript có thể cần `as any` để tránh lỗi kiểu dữ liệu
  }

    console.log("FormData Sent:", formData);

    const response = await axios.post(`${BASE_URL_2}/shop-services`, formData, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    console.log("Product Created Successfully:", response.data);
    return response.data;
} catch (error: any) {
    console.error("Lỗi khi thêm dich vu:", error);
    throw error;
  }
};

// Lấy thông tin dich vu theo id
export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(`${BASE_URL_2}/shop-services/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("get dich vu by id data:", response.data); // Check the response structure

    if (response.data.success) {
      return response.data.data || null; // Return the product data if success
    } else {
      throw new Error(response.data.message || "Failed to fetch service");
    }
  } catch (error) {
    console.error("Error fetching service by id:", error);
    throw error;
  }
};

export const editServiceById = async (id: string, serviceData: Partial<Service>): Promise<any> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    // Tạo FormData
    const formData = new FormData();

    // Thêm các trường dữ liệu vào FormData
    if (serviceData.name) formData.append("name", serviceData.name);
    if (serviceData.price !== undefined) formData.append("price", serviceData.price.toString());
    if (serviceData.description) formData.append("description", serviceData.description);
    if (serviceData.categoryId) formData.append("categoryId", serviceData.categoryId);


    // Thêm ảnh vào FormData nếu có
    if (serviceData.image && typeof serviceData.image === "object" && "uri" in serviceData.image) {
      formData.append("image", {
        uri: serviceData.image.uri,
        type: serviceData.image.type || "image/jpeg", // Mặc định là JPEG nếu không có type
        name: serviceData.image.fileName || "image.jpg",
      } as any);
    }

    // Log dữ liệu gửi đi
    console.log("🚀 FormData dich vu gửi đi:");
    //@ts-ignore
    formData._parts.forEach((part) => {
      console.log(`${part[0]}:`, part[1]);
    });

    // Gửi request PATCH
    const response = await axios.patch(`${BASE_URL_2}/shop-services/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Services Edited Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi chỉnh sửa dich vu:", error);
    throw error;
  }
};

