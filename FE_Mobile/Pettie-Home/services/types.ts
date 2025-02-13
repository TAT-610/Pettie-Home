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

export interface Order {
    id: string;
    orderId: string;
    status: string;
    time: string;
    scheduledTime: string;
    items: { id: string; name: string; price: number; quantity: number }[];
    subtotal: number;
    shipping: number;
    total: number;
    address: string;
    paymentMethod: string;
    paymentTime: string;
    customerName: string;
    customerPhone: string;
    customerNote: string;
}

export interface DogService {
    id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

export interface CatService {
    id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;

}

