import axios from "axios";

const BASE_URL = "http://14.225.198.232:8080/api/v1";

export interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  averageRating: number;
  status: string;
}

export interface GetShopsParams {
  search?: string;
  status?: "Pending" | "Approved" | "Reject";
  address?: string;
  averageRating?: number;
  pageNumber?: number;
  pageSize?: number;
}

// Lấy danh sách Shop (Admin)
export const getAllShops = async (params: GetShopsParams = {}): Promise<Shop[]> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Chưa có access_token");

  interface GetShopsResponse {
    data: {
      items: Shop[];
    };
  }

  try {
    const response = await axios.get<GetShopsResponse>(`${BASE_URL}/shops/admin`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        pageNumber: 1,
        pageSize: 10,
        ...params, // Truyền bộ lọc nếu có
      },
    });

    return response.data?.data?.items || [];
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách shop:", error);
    return [];
  }
};


// Cập nhật trạng thái Shop (Pending, Approved, Rejected)
export const updateShopStatus = async (shopId: string, status: string): Promise<boolean> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Chưa có access_token");

  try {
    const response = await axios.patch(
      `${BASE_URL}/shops/status`,
      { shopId, status }, // Body request
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Cập nhật trạng thái shop thành công:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Lỗi cập nhật trạng thái shop:", error);
    return false;
  }
};
