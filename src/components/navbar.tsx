import { Menu, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Cart } from "./cart";
import { Product } from "@/repositories/products";
import { CartItemWithProduct } from "@/repositories/cart";

export interface NavbarProps {
  cartItems: CartItemWithProduct[];
}

export function Navbar({ cartItems }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4">
                  <a href="#" className="text-lg font-medium">
                    Home
                  </a>
                  <a href="#" className="text-lg font-medium">
                    Products
                  </a>
                  <a href="#" className="text-lg font-medium">
                    About
                  </a>
                  <a href="#" className="text-lg font-medium">
                    Contact
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="#" className="text-xl font-bold ">
              <ShoppingBag />
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 ">
              Home
            </a>
            <a href="#" className="text-gray-600 ">
              Products
            </a>
            <a href="#" className="text-gray-600 ">
              About
            </a>
            <a href="#" className="text-gray-600 ">
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <Cart cartItems={cartItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
