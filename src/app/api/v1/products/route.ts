import { sort } from "@/lib/utils";
import { SortBy } from "@/repositories/products";
import { mockProducts } from "@/repositories/products/data";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const categories = request.nextUrl.searchParams.getAll("category");
  const ratings = request.nextUrl.searchParams.getAll("rating");
  const sortBy = request.nextUrl.searchParams.get("sortBy") as SortBy;

  let filteredProducts = mockProducts;

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      categories.includes(String(product.categoryId))
    );
  }

  if (ratings.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      ratings.includes(String(Math.round(product.rating)))
    );
  }

  if (sortBy) {
    filteredProducts = sort(filteredProducts, sortBy);
  }

  return NextResponse.json(filteredProducts);
}
