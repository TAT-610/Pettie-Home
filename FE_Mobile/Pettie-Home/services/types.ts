export interface Profile {
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

