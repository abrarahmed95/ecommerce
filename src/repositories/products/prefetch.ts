import { QueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "./constants";
import { ProductService } from "./service";

export async function prefetchProducts(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: ProductService.getAll,
  });
}
