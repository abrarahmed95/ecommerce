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
