import { mockCategories } from "./data";
import { Category } from "./type";

class _CategoryService {
  async getAll(): Promise<Category[]>{
    return mockCategories;
  }

  async getById(id: number) {
    return mockCategories.find((category) => category.id === id);
  }
}

export const CategoryService = new _CategoryService();
