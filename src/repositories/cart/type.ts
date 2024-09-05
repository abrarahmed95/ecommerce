import { Product } from "../products";

export interface CartItem {
  id: number;
  quantity: number;
}

export type CartItemWithProduct = Pick<CartItem, "quantity"> & {
  product: Product;
};
