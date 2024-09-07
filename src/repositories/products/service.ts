import { FindProductsQuery, Product, SortBy } from "./types";
import { mockProducts } from "./data";
import { api } from "@/lib/client";

class _ProductService {
  async getAll({
    categories = [],
    ratings = [],
    sortBy,
    price,
    query,
  }: FindProductsQuery): Promise<Product[]> {
    const params = new URLSearchParams();

    if (categories && categories.length > 0) {
      categories.forEach((category) =>
        params.append("category", category.toString())
      );
    }

    if (ratings && ratings.length > 0) {
      ratings.forEach((rating) => params.append("rating", rating.toString()));
    }

    if (sortBy) {
      params.append("sortBy", sortBy);
    }

    if (price) {
      params.append("price", price.join(","));
    }

    if (query) {
      params.set("q", query);
    }

    console.log(params.toString());

    const url = `/products?${params.toString()}`;

    const response = await api.get<{ data: Product[] }>(url);
    return response.data;
  }

  async getById(id: number): Promise<Product | undefined> {
    return mockProducts.find((product) => product.id === id);
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    return mockProducts.filter((product) => product.categoryId === categoryId);
  }

  async search(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async sort(products: Product[], sortBy: SortBy): Promise<Product[]> {
    const sortedProducts = [...products];
    switch (sortBy) {
      case SortBy.PRICE_ASC:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case SortBy.PRICE_DESC:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case SortBy.RATING:
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sortedProducts;
  }

  async filterByPrice(
    products: Product[],
    minPrice: number,
    maxPrice: number
  ): Promise<Product[]> {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
}

export const ProductService = new _ProductService();
