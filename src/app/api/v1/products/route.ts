import { sort } from "@/lib/utils";
import { SortBy } from "@/repositories/products";
import { mockProducts } from "@/repositories/products/data";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const categories = request.nextUrl.searchParams.getAll("category");
  const ratings = request.nextUrl.searchParams.getAll("rating");
  const sortBy = request.nextUrl.searchParams.get("sortBy") as SortBy;
  const priceRange = request.nextUrl.searchParams
    .get("price")
    ?.split(",")
    .map(Number) as number[];

  const query = request.nextUrl.searchParams.get("q");

  let filteredProducts = mockProducts;

  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.trim().toLowerCase().includes(query)
    );
  }

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

  if (priceRange?.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }

  if (sortBy) {
    filteredProducts = sort(filteredProducts, sortBy);
  }

  return Response.json({
    data: filteredProducts,
  });
}
