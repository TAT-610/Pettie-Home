import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Orders } from "@/services/types";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const createOrder = async (orderData: {
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerEmail: string;
  note: string;
  paymentMethod: string;
  appointmentDate: string;
  shopId: string;
}): Promise<any> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }
    const response = await axios.post(`${BASE_URL_2}/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Create order response:", response.data); // Kiểm tra phản hồi từ API

    if (response.data.success) {
      return response.data.data; // Đảm bảo trả về thông tin đơn hàng đã tạo
    } else {
      throw new Error(response.data.message || "Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getPaymentInfo = async (orderCode: Number): Promise<any> => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }
    const response = await axios.get(`${BASE_URL_2}/payment/payment_link/info/${orderCode}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Payment info response:", response.data); // Kiểm tra phản hồi từ API

    if (response.data.success) {
      return response.data.data; // Đảm bảo trả về thông tin thanh toán
    } else {
      throw new Error(response.data.message || "Failed to get payment info");
    }
  } catch (error) {
    console.error("Error fetching payment info:", error);
    throw error;
  }
};

export const getOrdersByStatus = async (params: {
    status?: "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled";
    pageNumber?: number;
    pageSize?: number;
}): Promise<Orders[]> => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (!access_token) {
            throw new Error("Access token is not found");
        }

        const response = await axios.get(`${BASE_URL_2}/orders/user`, {
            params: {
                status: params.status,
                pageNumber: params.pageNumber || 1,
                pageSize: params.pageSize || 10,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("get user orders data:", response.data);

        if (response.data.success) {
            return response.data.data.items; // Trả về mảng các đơn hàng
        } else {
            throw new Error(response.data.message || "Failed to fetch user orders");
        }
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};

export const getOrderDetailByCode = async (code: string): Promise<Orders> => {
  try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
          throw new Error("Access token is not found");
      }

      const response = await axios.get(`${BASE_URL_2}/orders/${code}`, {
          headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
          },
      });

      console.log("Order code:", code);
      console.log("get order detail data:", response.data);

      if (response.data.success) {
          return response.data.data; // Trả về thông tin chi tiết đơn hàng
      } else {
          throw new Error(response.data.message || "Failed to fetch order detail");
      }
  } catch (error) {
      console.error("Error fetching order detail:", error);
      throw error;
  }
};

