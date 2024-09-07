export enum SortBy {
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
  RATING = "rating",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  rating: number;
  image: string;
}

export type FindProductsQuery = {
  categories?: number[];
  ratings?: number[];
  sortBy?: SortBy;
  price?: number[];
  query?: string;
};
