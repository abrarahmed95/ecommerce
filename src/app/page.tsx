import { ProductsPage } from "@/components/page/products-page";
import getQueryClient from "@/lib/query/queryClient";
import { prefetchProducts } from "@/repositories/products/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();

  await prefetchProducts(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
