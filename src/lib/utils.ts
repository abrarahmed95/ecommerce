import { Product, SortBy } from "@/repositories/products";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sort(products: Product[], sortBy: SortBy): Product[] {
  const sortedProducts = [...products];
  switch (sortBy) {
    case SortBy.PRICE_ASC:
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case SortBy.PRICE_DESC:
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case SortBy.RATING:
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return sortedProducts;
}
