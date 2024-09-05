import { useQuery } from "@tanstack/react-query";
import { ProductService } from "./service";
import { PRODUCTS_QUERY_KEY } from "./constants";
import { SortBy } from "./types";

export const useProducts = (filters: {
  categories?: number[];
  ratings?: number[];
  sortBy?: SortBy;
}) => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: () => ProductService.getAll(filters),
  });
};
