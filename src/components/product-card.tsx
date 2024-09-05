import { Product } from "@/repositories/products";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <Image
          width={100}
          height={100}
          src={product?.image}
          alt={product?.name}
          className="w-full h-40 object-cover mb-2 rounded-md"
        />
        <h3 className="font-bold">{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <p>Rating: {product.rating}/5</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addToCart(product)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
