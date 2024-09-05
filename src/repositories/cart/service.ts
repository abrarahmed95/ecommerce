import { Product } from "../products";
import { CartItem, CartItemWithProduct } from "./type";

class _CartService {
  private items: CartItem[] = [];

  async addToCart(item: CartItem): Promise<CartItem[]> {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }

    return this.items;
  }

  async getItems(products: Product[]): Promise<CartItemWithProduct[]> {
    const items = this.items.map((cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);

      return {
        product,
        quantity: cartItem.quantity,
      };
    });

    return items as CartItemWithProduct[];
  }

  async clearCart() {
    this.items = [];
  }

  async removeFromCart(itemId: number) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  async getTotalPrice(products: Product[]) {
    return this.items.reduce((acc, item) => {
      const product = products.find(
        (product) => item.id === product.id
      ) as Product;

      return acc + product?.price * item?.quantity;
    }, 0);
  }
}

export const CartService = new _CartService();
