import { NextResponse } from "next/server";

export const mockCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Fitness" },
  { id: 4, name: "Home" },
];

export function GET() {
  return NextResponse.json(mockCategories);
}
