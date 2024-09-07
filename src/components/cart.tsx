import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";
import { CartType } from "@/repositories/cart";

interface CartProps {
  cart: CartType;
}

export function Cart({ cart }: CartProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <ShoppingCart />
          {cart?.totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {cart?.totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Review the items in your cart before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="cart-items">
          {cart?.totalItems > 0 ? (
            cart?.products.map((item) => (
              <div
                key={item.id}
                className="cart-item flex justify-between py-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="cart-total mt-4 border-t pt-4">
          <p className="flex justify-between">
            <span>Total Price:</span>
            <span>${cart?.price?.toFixed(2) ?? 0}</span>
          </p>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="mt-4">
              Proceed to Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
