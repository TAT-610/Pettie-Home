import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Orders } from "@/services/types";

const BASE_URL_2 = "http://14.225.198.232:8080/api/v1";

export const getOrderByShop = async (params: {
    status?: "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled";
    pageNumber?: number;
    pageSize?: number;
}): Promise<Orders[]> => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (!access_token) {
            throw new Error("Access token is not found");
        }

        const response = await axios.get(`${BASE_URL_2}/orders/shop`, {
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

        console.log("get orders data:", response.data);

        if (response.data.success) {
            return response.data.data.items; // Trả về mảng các đơn hàng
        } else {
            throw new Error(response.data.message || "Failed to fetch orders");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
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

export const updateOrderStatus = async (
    id: string,
    status: "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled",
    cancelReason?: string
): Promise<Orders> => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (!access_token) {
            throw new Error("Access token is not found");
        }

        const requestBody = {
            status,
            cancelReason: status === "Canceled" ? cancelReason : undefined,
        };

        const response = await axios.patch(`${BASE_URL_2}/orders/${id}`, requestBody, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("update order status data:", response.data);

        if (response.data.success) {
            return response.data.data; // Trả về thông tin đơn hàng sau khi cập nhật
        } else {
            throw new Error(response.data.message || "Failed to update order status");
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};