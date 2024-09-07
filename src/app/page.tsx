import { ProductsPage } from "@/components/page/products-page";
import getQueryClient from "@/lib/query/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Page() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductsPage />
      </Suspense>
    </HydrationBoundary>
  );
}
