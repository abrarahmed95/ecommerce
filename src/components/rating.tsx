import { Star } from "lucide-react";
import React from "react";
import { Checkbox } from "./ui/checkbox";

export interface RatingProps {
  onChange: (rating: number) => void;
}
export function Rating({ onChange }: RatingProps) {
  const handleCheckboxChange = (rating: number) => {
    console.log(rating);
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
