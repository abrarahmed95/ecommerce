import { useQuery } from "@tanstack/react-query";
import { ProductService } from "./service";
import { PRODUCTS_QUERY_KEY } from "./constants";
import { FindProductsQuery, SortBy } from "./types";

export const useProducts = (filters: FindProductsQuery) => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, filters],
    queryFn: () => ProductService.getAll(filters),
  });
};
