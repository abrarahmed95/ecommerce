"use client";

import { HeroSection } from "../hero-section";
import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar";
import { Product, SortBy, useProducts } from "@/repositories/products";
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

export function ProductsPage() {
  const searchParams = useSearchParams();

  const selectedCategoriesParam = searchParams.getAll("category").map(Number);
  const selectedRatingsParam = searchParams.getAll("rating").map(Number);
  const selectedSortByParam = searchParams.get("sortBy") as SortBy;
  const params = {
    categories: selectedCategoriesParam,
    ratings: selectedRatingsParam,
    sortBy: selectedSortByParam,
  };

  const { data: categories } = useCategories();
  const { data: products } = useProducts(params);

  const { data: cartItems } = useCartItems({
    products: products!,
  });

  const router = useRouter();

  const addToCart = useAddToCart();

  const onFilterChange = (filterType: string, value: any) => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "category" || filterType === "rating") {
      const currentCategories = params.getAll(filterType);

      if (currentCategories.includes(String(value))) {
        params.delete(filterType);
        currentCategories
          .filter((cat) => cat !== String(value))
          .forEach((cat) => params.append(filterType, cat));
      } else {
        params.append(filterType, value);
      }
    } else {
      params.set(filterType, value.toString());
    }

    router.replace(`/?${params.toString()}`, {
      scroll: false,
    });
  };

  const onCategoryChange = (category: Category) => {
    onFilterChange("category", category.id);
  };

  const onRatingChange = (rating: number) => {
    onFilterChange("rating", rating.toString());
  };

  const onPriceRangeChange = (range: number) => {
    onFilterChange("priceRange", range);
  };

  const onSortChange = (sortBy: SortBy) => {
    onFilterChange("sortBy", sortBy);
  };

  const onAddToCart = (product: Product) => {
    addToCart.mutate({
      id: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar cartItems={cartItems!} />
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
              maxPrice={100}
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
                    defaultValue={params?.sortBy}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
