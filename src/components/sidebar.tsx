"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Rating } from "./rating";
import { Category } from "@/repositories/categories/type";
import { SortBy } from "@/repositories/products";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface SidebarProps {
  selectedFilters: {
    categories?: number[];
    ratings?: number[];
    sortBy?: SortBy;
    price?: number[];
  };
  categories: Category[];
  onCategoryChange: (category: Category) => void;
  onRatingChange: (rating: number) => void;
  onPriceRangeChange: (price: number[]) => void;
  maxPrice?: number;
}

export function Sidebar({
  selectedFilters,
  categories,
  onCategoryChange,
  onRatingChange,
  onPriceRangeChange,
  maxPrice = 1000,
}: SidebarProps) {
  const DEFAULT_RANGE = [50, 500];
  const params = useSearchParams();
  const router = useRouter();
  const [princeRange, setPriceRange] = useState<number[]>();

  useEffect(() => {
    setPriceRange(selectedFilters?.price ?? DEFAULT_RANGE);
  }, [selectedFilters?.price]);

  const clearFilters = () => {
    router.push("/", { scroll: false });
  };

  const onValueCommit = (range: number[]) => {
    onPriceRangeChange(range);
  };

  const showFilter =
    params.has("category") || params.has("rating") || params.has("price");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Filters{" "}
          {showFilter && (
            <Button size={"sm"} variant={"outline"} onClick={clearFilters}>
              <X size={16} />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Category:</label>

            <div className="space-y-2 mt-2">
              {categories?.map((category) => (
                <div
                  className="flex items-center space-x-2"
                  key={category.name}
                >
                  <Checkbox
                    checked={selectedFilters.categories?.includes(category.id)}
                    id="items"
                    onCheckedChange={() => onCategoryChange(category)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Rating:</label>

            <div className="mt-2">
              <Rating
                onChange={onRatingChange}
                selectedFilters={selectedFilters}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Price Range:</label>
            <Slider
              className="mt-10"
              value={princeRange}
              max={maxPrice}
              step={10}
              onValueCommit={onValueCommit}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
