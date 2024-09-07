import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "./type";
import { CartService } from "./service";
import { CART_QUERY_KEY } from "./constants";
import { Product } from "../products";

export const useCartItems = () => {
  return useQuery({
    queryKey: [CART_QUERY_KEY],
    queryFn: () => CartService.getItems(),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      CartService.addToCart(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CART_QUERY_KEY],
      });
    },
  });
};
