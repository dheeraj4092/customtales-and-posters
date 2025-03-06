export type ProductCategory = 'book' | 'poster' | 'custom';
export type AgeGroup = 'toddler' | 'preschool' | 'elementary' | 'middle' | 'teen' | 'adult';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  age_groups: AgeGroup[];
  images: string[];
  featured?: boolean;
  tags?: string[];
  stock?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  customization?: {
    images?: string[];
    description?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
  wishlist: string[]; // Product IDs
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomOrderDetails {
  type: 'book' | 'poster';
  description: string;
  images: string[];
  targetAge?: AgeGroup;
  additionalNotes?: string;
}
