import axios from "axios";
import { ProfileShop } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL_2 = "https://pettiehome.online/api/v1"

interface ShopData {
  id: string;
  name: string;
  imageFileName?: string;
  imageUrl?: string | null;
}

const updateImageUrl = (data: ShopData): ShopData => {
  if (!data) return data;

  // Cập nhật imageUrl cho shop
  if (!data.imageUrl && data.imageFileName) {
    data.imageUrl = `${data.imageFileName}`;
  }

  return data;
};

export const getShopAccount = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const response = await axios.get(`${BASE_URL_2}/shops/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch profiles");
    }

    let shopData = response.data.data;

    // Cập nhật imageUrl nếu bị null
    shopData = updateImageUrl(shopData);

    // Lưu shopId vào AsyncStorage
    const shopId = shopData.id;
    await AsyncStorage.setItem("shopId", shopId);
    console.log("Shop id saved in AsyncStorage:", shopId);

    console.log("Updated Shop Data:", shopData);
    return shopData;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin Shop theo ID
export const updateShopById = async (updateData: Partial<ProfileShop>): Promise<ProfileShop> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }
    // Tạo FormData
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    if (updateData.name) formData.append("name", updateData.name);
    if (updateData.description) formData.append("description", updateData.description);
    if (updateData.closingTime) formData.append("closingTime", updateData.closingTime);
    if (updateData.openingTime) formData.append("openingTime", updateData.openingTime);
    if (updateData.email) formData.append("email", updateData.email);
    if (updateData.address) formData.append("address", updateData.address);
    if (updateData.phone) formData.append("phone", updateData.phone);

    // Thêm ảnh vào FormData nếu có
    if (updateData.imageUrl && typeof updateData.imageUrl === "object" && "uri" in updateData.imageUrl) {
      formData.append("image", {
        uri: updateData.imageUrl.uri,
        type: updateData.imageUrl.type,
        name: updateData.imageUrl.fileName || "image.jpg",
      } as any); // TypeScript có thể cần `as any` để tránh lỗi kiểu dữ liệu
    }

    // Log dữ liệu gửi đi
    console.log("🚀 FormData gửi đi:");
    //@ts-ignore
    formData._parts.forEach((part) => {
      console.log(`${part[0]}:`, part[1]);
    });

    // Gửi request PATCH
    const response = await axios.patch(`${BASE_URL_2}/shops`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Product Edited Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi chỉnh sửa profileShop:", error);
    throw error;
  }
};
