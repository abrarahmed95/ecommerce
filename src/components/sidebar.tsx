import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Rating } from "./rating";
import { Category } from "@/repositories/categories/type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";

export interface SidebarProps {
  categories: Category[];
  onCategoryChange: (category: Category) => void;
  onRatingChange: (rating: number) => void;
  onPriceRangeChange: (price: number) => void;
  maxPrice: number;
}

const formSchema = z.object({
  categories: z.array(z.string()),
  rating: z.number().min(0).max(5),
  priceRange: z.number().min(0),
});

export function Sidebar({
  categories,
  onCategoryChange,
  onRatingChange,
  onPriceRangeChange,
  maxPrice = 100,
}: SidebarProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      categories: [],
      rating: undefined,
      priceRange: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Category:</label>

                <div className="space-y-2">
                  {categories?.map((category) => (
                    <div
                      className="flex items-center space-x-2"
                      key={category.name}
                    >
                      <Checkbox
                        id="items"
                        onChange={() => onCategoryChange(category)}
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

                <Rating onChange={onRatingChange} />
              </div>
              <div>
                <label className="block mb-2 font-medium">Price Range:</label>
                <Slider
                  defaultValue={[50]}
                  max={maxPrice}
                  step={1}
                  onChange={console.log}
                />
                <div className="flex justify-between mt-2">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
