export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  category: string;
  isBestSeller?: boolean;
  stockCount: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export type PaymentMethod = 'COD' | 'Easypaisa' | 'JazzCash' | 'BankTransfer';

export interface SiteSettings {
  logoUrl: string;
  adminPassword?: string;
}

export interface Order {
  id: string;
  user: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
  items: CartItem[];
  paymentMethod: PaymentMethod;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}
