import { getShopAccount } from "@/services/shop/apiprofile";
import { ConfirmEmailDTO, CreateAccountDTO, CreateShopDTO, GenerateEmailOTPRequest, Profile, ResendOtpDTO, UpdateShopProfile, UpdateUserProfile, VerifyEmailOTPRequest } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL_1 = "http://14.225.198.232:8080";
const BASE_URL_2 = "http://14.225.198.232:8080/api/v1"

// Hàm đăng ký
import { AxiosResponse } from "axios";

export const signUpUser = async (request: CreateAccountDTO): Promise<AxiosResponse<any> | { error: string }> => {
  console.log("signUpUser req:", request);
  try {
    const response = await axios.post(`${BASE_URL_2}/auth/signup`, request);
    console.log("signUpUser Response:", response);
    return response; // Trả về AxiosResponse nếu thành công
  } catch (error: any) {
    const errorDetail = error?.response?.data?.detail;

    if (errorDetail === "Email is registered and not authenticated. Check your mailbox!") {
      console.warn("Email đã đăng ký nhưng chưa xác thực, gửi lại OTP...");
      return { error: "EmailNotVerified" }; // Trả về object custom thay vì lỗi
    }

    console.error("Get User Account Error: ", error);
    throw error; // Ném lỗi nếu không phải lỗi EmailNotVerified
  }
};



export const signUpShop = async (request: CreateShopDTO): Promise<AxiosResponse<any> | { error: string }> => {
  console.log("signUpShop req:", request);
  try {
    const response = await axios.post(`${BASE_URL_2}/shops/register`, request);
    console.log("signUpShop Response:", response);
    return response;
  } catch (error: any) {
    const errorDetail = error?.response?.data?.detail;

    if (errorDetail === "Email is registered and not authenticated. Check your mailbox!") {
      console.warn("Email đã đăng ký nhưng chưa xác thực, gửi lại OTP...");
      return { error: "EmailNotVerified" };
    }

    console.error("Sign Up Shop Error: ", error);
    throw error;
  }
};

export const resendOtp = async (request: ResendOtpDTO) => {
  console.log("resendOtp", request);
  try {
    const response = await axios.post(`${BASE_URL_2}/auth/otp/resend`, request)
    console.log("resend Response:", response);

    return response;
  } catch (error) {
    console.error("resendOtp Error: ", error)
    throw error;
  }
}

export const confirmEmail = async (request: ConfirmEmailDTO) => {
  console.log("confirmEmail req: ", request);
  try {
    const response = await axios.post(`${BASE_URL_2}/auth/confirm-email`, request)
    console.log("confirmEmail Response:", response);

    return response;
  } catch (error) {
    console.error("confirmEmail Error: ", error)
    throw error;
  }
}

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
    const access_token = response.data.access_token;
    const id_token = response.data.id_token;


    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("id_token", id_token);

    // gọi hàm getUserAccount để lấy thông tin user
    let userData = null;
    let shopData = null;

    try {
      userData = await getUserAccount();
    } catch (error: any) {
      if (error.response?.status === 403) {
        console.warn("User account is forbidden, trying shop account...");
      } else {
        console.error("Unexpected error in getUserAccount:", error);
      }
    }

    if (!userData) {
      try {
        shopData = await getShopAccount();
      } catch (error: any) {
        if (error.response?.status === 403) {
          console.warn("Shop account is forbidden as well.");
        } else {
          console.error("Unexpected error in getShopAccount:", error);
        }
      }
    }

    console.log("API Response :", response.data);
    return {
      access_token,
      id_token,
      userData,
      shopData
    };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

// ham get UserAccount
export const getUserAccount = async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found")
    }

    const response = await axios.get(
      `${BASE_URL_2}/account/users/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      }
    )

    console.log("User Data ne`: ", response.data);

    return response.data;
  } catch (error) {
    console.error("Get User Account Error: ", error)
    throw error;
  }
}





// Xác minh OTP email
export const verifyEmailOtp = async (request: VerifyEmailOTPRequest) => {
  try {
    console.log("Gửi yêu cầu xác minh OTP:", request);
    const response = await axios.post(`${BASE_URL_2}/auth/otp/resend`, {
      otp: parseInt(request.otp, 10), // Chuyển đổi otp thành số nguyên
      request: {
        email: request.email, // Email của người dùng
        isSignUp: request.isSignUp, // Có phải là yêu cầu đăng ký không
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Lỗi xác minh OTP:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Xác minh OTP thất bại.");
  }
};

// edit profile user
export const editProfileUser = async (request: UpdateUserProfile) => {
  console.log("Req Edit profile:", request);
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found")
    }

    const response = await axios.patch(
      `${BASE_URL_2}/account/users/me`,
      request,  // Gửi dữ liệu request vào đây
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      }
    )

    console.log("Res edit profile api: ", response.data);

    return response.data;
  } catch (error) {
    console.error("edit profile Error: ", error)
    throw error;
  }

}
// edit profile shop
export const editProfileShop = async (request: UpdateShopProfile) => {
  console.log("Req Edit profile:", request);
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    const formData = new FormData();
    
    if (request.name) formData.append("name", request.name);
    if (request.phone) formData.append("phone", request.phone);
    if (request.description) formData.append("description", request.description);
    if (request.address) formData.append("address", request.address);
    if (request.openingTime) formData.append("openingTime", request.openingTime);
    if (request.closingTime) formData.append("closingTime", request.closingTime);
    if (request.bankAccountNumber) formData.append("bankAccountNumber", request.bankAccountNumber);
    if (request.bankName) formData.append("bankName", request.bankName);
    if (request.bankAccountName) formData.append("bankAccountName", request.bankAccountName);

    if (request.imageUrl) {
      formData.append("image", {
        uri: request.imageUrl.uri,
        name: request.imageUrl.fileName || "profile.jpg",
        type: request.imageUrl.type,
      } as any);
    }

    const response = await axios.patch(`${BASE_URL_2}/shops`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Res edit profile api: ", response.data);
    return response.data;
  } catch (error) {
    console.error("edit profile Error: ", error);
    throw error;
  }
};


// upload hình ảnh multipart/form-data
export const uploadAvatar = async (imageUri: string) => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Access token is not found");
    }

    // Tạo FormData để gửi file ảnh
    const formData = new FormData();
    formData.append("avatar", {
      uri: imageUri,
      name: "avatar.jpg", // Đặt tên file
      type: "image/jpeg", // Kiểu file
    });

    const response = await axios.post(
      `${BASE_URL_2}/account/users/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload avatar success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    throw error;
  }
};