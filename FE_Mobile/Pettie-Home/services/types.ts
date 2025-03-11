export interface Profile {
    id: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string; // Thêm kiểu dữ liệu cho phoneNumber
    image?: string; // Nếu có ảnh đại diện, có thể thêm vào (tuỳ chọn)
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
}

export interface Service {
    id: string;
    name: string;
    price: string;
    status: string;
    imageUrl: { uri: string; type: string; fileName?: string } | null;
    imageFileName: string;
    description: string;
    categoryId: string;
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

}