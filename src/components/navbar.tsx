"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Cart } from "./cart";
import { CartType } from "@/repositories/cart";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
export interface NavbarProps {
  cart: CartType;
}

export function Navbar({ cart }: NavbarProps) {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams?.get("q") ?? "");
  const [debouncedValue, setDebouncedValue] = useState("");
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    500,
    [searchValue]
  );

  useEffect(() => {
    if (debouncedValue === "") {
      params.delete("q");
    }

    if (debouncedValue && debouncedValue !== "") {
      params.set("q", searchValue);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedValue, params]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
    params.delete("q");
    router.push(`?${params.toString()}`, { scroll: false });
  };

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
            <Link
              href="/"
              className="text-xl font-bold border py-2 px-3 rounded-md "
            >
              <ShoppingBag size={24} />
            </Link>
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
                value={searchValue}
                type="text"
                placeholder="Search"
                className="pl-10 pr-8 py-2"
                onChange={handleOnChange}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              {searchValue && (
                <X
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={14}
                  onClick={() => clearSearch()}
                />
              )}
            </div>

            <Cart cart={cart} />
          </div>
        </div>
      </div>
    </nav>
  );
}
