import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "./constants";
import { CategoryService } from "./service";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: CategoryService.getAll,
  });
};
