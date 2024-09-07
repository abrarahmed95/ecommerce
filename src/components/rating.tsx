import { Star } from "lucide-react";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { SortBy } from "@/repositories/products";

export interface RatingProps {
  onChange: (rating: number) => void;
  selectedFilters: {
    categories?: number[];
    ratings?: number[];
    sortBy?: SortBy;
  };
}
export function Rating({ selectedFilters, onChange }: RatingProps) {
  const handleCheckboxChange = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }, (_, i) => i + 1)
        .reverse()
        .map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={selectedFilters?.ratings?.includes(rating)}
              onClick={() => handleCheckboxChange(rating)}
            />
            <label
              htmlFor={`rating-${rating}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-1"
            >
              {Array.from({ length: rating }, (_, index) => (
                <Star key={index} className="w-5 h-5" />
              ))}
            </label>
          </div>
        ))}
    </div>
  );
}
