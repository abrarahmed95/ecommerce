import { Product } from "../products";

export interface CartItem extends Product {
  quantity: number;
}

export type CartType = {
  totalItems: number;
  price: number;
  products: CartItem[];
};
