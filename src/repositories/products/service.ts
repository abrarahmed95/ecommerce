import { Product, SortBy } from "./types";
import { mockProducts } from "./data";

class _ProductService {
  async getAll({
    categories = [],
    ratings = [],
    sortBy,
  }: {
    categories?: number[];
    ratings?: number[];
    sortBy?: SortBy;
  }): Promise<Product[]> {
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
    const url = `/api/v1/products?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const products: Product[] = await response.json();

      return products;
    } catch (error) {
      throw error;
    }
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
