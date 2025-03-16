export interface User {
  fullName: string;
  email: string;
  avatar: string;
}

export interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "completed" | "cancelled";

export interface Order {
  id: string;
  user_id: string;
  user: User;
  name: string;
  phone: string;
  address: string;
  discount_code: string;
  discount_percent: string;
  final_total: string;
  free_of_charge: string;
  payment_method: string;
  status: OrderStatus;
  products: Product[];
  created_at: string;
  updated_at: string;
}
