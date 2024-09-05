import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem } from "./type";
import { CartService } from "./service";
import { CART_QUERY_KEY } from "./constants";
import { CATEGORIES_QUERY_KEY } from "../categories/constants";
import { Product } from "../products";

export const useCartItems = ({ products }: { products: Product[] }) => {
  return useQuery({
    queryKey: [CART_QUERY_KEY],
    queryFn: () => CartService.getItems(products),
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationKey: [CATEGORIES_QUERY_KEY],
    mutationFn: (item: CartItem) => CartService.addToCart(item),
  });
};
