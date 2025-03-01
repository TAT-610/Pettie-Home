export interface Profile {
    id: string; 
    fullname: string;
    email: string; 
    emailConfirmed: boolean;
    phoneNumber: string; // Thêm kiểu dữ liệu cho phoneNumber
    image?: string; // Nếu có ảnh đại diện, có thể thêm vào (tuỳ chọn)
    rating?: number; // Nếu có đánh giá, có thể thêm vào (tuỳ chọn)
}

export interface ProfileShop {
    id: string;
    userName: string;
    phone: string;
    description: string;
    email: string;
    rating: string;
    birthDate: string;
    address: string;
    openingTime: string;
    closingTime: string;
    image: string;
    role: string;
    fullname: string;
    password: string;
}


export interface Products {
    id: string;
    shopId: string;
    name: string;
    price: number;
    quantity: number;
    status: string;
    image: string;
    expiry: string;
}

