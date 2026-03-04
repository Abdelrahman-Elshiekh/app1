export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  id: number;
  user: User;
  shippingAddress: ShippingAddress;
  cartItems: CartItem[];
  paymentMethodType: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
