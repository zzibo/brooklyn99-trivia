import categoriesData from "../../generated/categories.json";
import type { Category } from "./types";

const categories: Category[] = categoriesData as Category[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
