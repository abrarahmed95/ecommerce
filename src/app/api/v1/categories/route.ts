import { mockCategories } from "@/repositories/categories/data";

export function GET() {
  return Response.json(mockCategories);
}
