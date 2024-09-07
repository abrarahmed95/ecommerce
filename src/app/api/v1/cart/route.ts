import { NextRequest } from "next/server";
import { mockProducts } from "@/repositories/products/data";
import { z } from "zod";

interface CartItem {
  id: number;
  quantity: number;
}

let cart: CartItem[] = [];

const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export async function GET() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const price = cart.reduce((sum, item) => {
    const product = mockProducts.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const cartProducts = cart.reduce((arr: CartItem[], item: CartItem) => {
    const product = mockProducts.find((p) => p.id === item.id);

    if (product) {
      arr.push({ ...product, quantity: item.quantity });
    }

    return arr;
  }, []);

  return Response.json({
    totalItems,
    price,
    products: cartProducts,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = addToCartSchema.safeParse(body);

  if (!response.success) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { productId, quantity } = response.data;

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;

    if (cart[existingItemIndex].quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
  } else if (quantity > 0) {
    cart.push({ id: productId, quantity });
  }

  return Response.json({ message: "Cart updated successfully" });
}
