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
    birthDate: string;
    address: string;
    openingTime: string;
    closingTime: string;
    imageUrl: { uri: string; type: string; fileName?: string } | null;
    role: string;
    fullname: string;
    password: string;
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
}

