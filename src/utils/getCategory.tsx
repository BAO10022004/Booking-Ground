import { categoryService } from "../services";

export async function getListCategory() {
  try {
    const categories = await categoryService.getAllCategories();
    return categories.map((cat) => ({
      categoryId: cat.id,
      name: cat.name,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default getListCategory;
