export interface Profile {
    id: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string; // Thêm kiểu dữ liệu cho phoneNumber
    pictureUrl?: { uri: string; type: string; pictureFileName?: string } | null;
    pictureFileName: string;
    rating?: number; // Nếu có đánh giá, có thể thêm vào (tuỳ chọn)
}

export interface ProfileShop {
    id: string;
    name: string;
    phone: string;
    description: string;
    email: string;
    rating: string;
    address: string;
    openingTime: TimeSpan;
    closingTime: TimeSpan;
    imageUrl: { uri: string; type: string; fileName?: string } | null;
    role: string;
    fullname: string;
    password: string;
    bankAccountNumber: string,
    bankName: string,
    bankAccountName: string,
}

export interface Products {
    id: string;
    categoryId: string;
    name: string;
    price: string;
    stock: string;
    image: { uri: string; type: string; fileName?: string } | null;  // Cập nhật kiểu image
    expiry: string;
    brand: string;
    description: string;
    imageFileName: { uri: string; type: string; fileName?: string } | null;

}

export interface Service {
    id: string;
    name: string;
    price: string;
    image: { uri: string; type: string; fileName?: string } | null;  // Cập nhật kiểu image
    imageUrl: { uri: string; type: string; fileName?: string } | null;
    imageFileName: { uri: string; type: string; fileName?: string } | null;
    status?: string; // Tùy chọn
    description?: string; // Tùy chọn
    categoryId?: string;
    category: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
};

interface OrderDetail {
    code: string;
    shopService: Service;
    product: Products;
    quantity: number;
    price: number;

}
type OrderStatus = "Pending" | "AwaitingSchedule" | "InProgress" | "Completed" | "Canceled";

export interface Orders {
    id: string;
    orderNumber: string;
    buyerName: string;
    buyerPhone: string;
    buyerAddress: string;
    buyerEmail: string;
    note: string | null;
    paymentMethod: string;
    paymentStatus: string;
    shippingName: string | null;
    shippingFee: number;
    status: OrderStatus; // Sử dụng kiểu OrderStatus
    totalAmount: number;
    appointmentDate: string;
    cancelReason: string | null;
    orderDetails: OrderDetail[];
}


export interface GenerateEmailOTPRequest {
    email: string, //($email && minLength: 1)
    isSignUp: boolean,
}

export interface VerifyEmailOTPRequest {
    email: string, //($email && minLength: 1)
    otp: string, //( minLength: 1 ^\6$)
    isSignUp: boolean,
}

export interface UpdateUserProfile {
    fullName: string;
    phoneNumber: string
    pictureUrl?: { uri: string; type: string; pictureFileName?: string } | null;
    pictureFileName: string;
}

export interface UpdateShopProfile {
    name?: string;
    phone?: string;
    description?: string;
    address?: string;
    openingTime?: TimeSpan;
    closingTime?: TimeSpan;
    imageUrl?: { uri: string; type: string; fileName?: string } | null;
    imageFileName: string;
    bankAccountNumber?: string,
    bankName?: string,
    bankAccountName?: string,
}

export interface CreateAccountDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface CreateShopDTO {
    email: string;
    password: string;
    shopName: string;
    phone: string;
    address: string;
    bankAccountNumber: string;
    bankName: string;
    bankAccountName: string;
    openingTime?: TimeSpan;
    closingTime?: TimeSpan;
}
export interface TimeSpan {
    ticks: number;
    days?: number;
    hours?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
    minutes?: number;
    seconds?: number;
    totalDays?: number;
    totalHours?: number;
    totalMilliseconds?: number;
    totalMicroseconds?: number;
    totalNanoseconds?: number;
    totalMinutes?: number;
    totalSeconds?: number;
}

export enum ResendOtpType {
    ConfirmEmail = "ConfirmEmail",
    ForgotPassword = "ForgotPassword"
}

export interface ResendOtpDTO {
    email: string;
    type: ResendOtpType;
}

export interface ConfirmEmailDTO {
    email: string;
    otp: number; //($int32)
}
export interface Shop {
    id: string;
    name: string;
    description: string | null;
    address: string;
    phone: string;
    email: string;
    balance: number;
    bankAccountNumber: string;
    bankName: string;
    bankAccountName: string;
    dateOfBirth: string | null;
    openingTime: string;
    closingTime: string;

    averageRating: number;
    totalRating: number;
    imageUrl: { uri: string; type: string; fileName?: string } | null;
    imageFileName?: string;
    distance?: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    code: string;
}
export interface Cart {
    shopId: string;
    ShopServiceId: string;
    productId: string;
    quantity: number;
}