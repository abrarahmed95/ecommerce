import { api } from "@/lib/client";
import { Product } from "../products";
import { CartType, CartItem } from "./type";

class _CartService {
  async addToCart({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) {
    const response = await api.post<
      { message: string },
      {
        productId: number;
        quantity: number;
      }
    >("/cart", {
      body: { productId, quantity },
    });

    return response;
  }

  async getItems(): Promise<CartType> {
    const response = await api.get<CartType>("/cart");

    return response;
  }
}

export const CartService = new _CartService();
