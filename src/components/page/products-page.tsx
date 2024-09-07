"use client";

import { HeroSection } from "../hero-section";
import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar";
import {
  FindProductsQuery,
  Product,
  SortBy,
  useProducts,
} from "@/repositories/products";
import { ProductCard } from "../product-card";
import { useCategories } from "@/repositories/categories/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddToCart, useCartItems } from "@/repositories/cart";
import { useSearchParams, useRouter } from "next/navigation";
import { Category } from "@/repositories/categories";
import { useEffect } from "react";
import { toast } from "sonner";

export function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addToCart = useAddToCart();

  const selectedCategoriesParam = searchParams.getAll("category").map(Number);
  const selectedRatingsParam = searchParams.getAll("rating").map(Number);
  const selectedSortByParam = searchParams.get("sortBy") as SortBy;
  const selectedPriceRange = searchParams.get("price")?.split(",").map(Number);
  const query = searchParams.get("q") ?? "";

  const params: FindProductsQuery = {
    categories: selectedCategoriesParam,
    ratings: selectedRatingsParam,
    sortBy: selectedSortByParam,
    price: selectedPriceRange,
    query,
  };

  const { data: categories } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts(params);
  const { data: cartItems } = useCartItems();

  useEffect(() => {
    if (addToCart.isSuccess) {
      toast.success("Item was added to cart successfully");
    }
  }, [addToCart.isSuccess]);

  const onFilterChange = (filterType: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "category" || filterType === "rating") {
      const currentCategories = params.getAll(filterType);

      if (currentCategories.includes(String(value))) {
        params.delete(filterType);
        currentCategories
          .filter((cat) => cat !== String(value))
          .forEach((cat) => params.append(filterType, cat));
      } else {
        params.append(filterType, String(value));
      }
    } else {
      params.set(filterType, value.toString());
    }

    router.push(`/?${params.toString()}`, {
      scroll: false,
    });
  };

  const onCategoryChange = (category: Category) => {
    onFilterChange("category", category.id);
  };

  const onRatingChange = (rating: number) => {
    onFilterChange("rating", rating.toString());
  };

  const onPriceRangeChange = (range: number[]) => {
    onFilterChange("price", range.join(","));
  };

  const onSortChange = (sortBy: SortBy) => {
    onFilterChange("sortBy", sortBy);
  };

  const onAddToCart = (product: Product) => {
    console.log(product);

    addToCart.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar cart={cartItems!} />
      <HeroSection />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 space-y-6">
            <Sidebar
              selectedFilters={params}
              categories={categories!}
              onCategoryChange={onCategoryChange}
              onRatingChange={onRatingChange}
              onPriceRangeChange={onPriceRangeChange}
            />
          </div>
          <div className="md:w-3/4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-6 ">Our Products</h2>
              <div className="flex items-center gap-2">
                <label className="font-medium">Sort by:</label>
                <div>
                  <Select
                    onValueChange={onSortChange}
                    value={params?.sortBy || SortBy.PRICE_ASC}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {isProductsLoading ? (
              <div className="flex items-center text-center">
                <p>Loading....</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
