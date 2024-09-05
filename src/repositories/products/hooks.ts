import { useQuery } from "@tanstack/react-query";
import { ProductService } from "./service";
import { PRODUCTS_QUERY_KEY } from "./constants";

export const useProducts = () => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: ProductService.getAll,
  });
};
