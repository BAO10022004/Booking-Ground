import { useState, useEffect } from "react";
import { categoryService } from "../services";
import Category from "../models/Category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        const transformedCategories = data.map((cat) => ({
          categoryId: cat.id,
          name: cat.name,
        })) as Category[];
        setCategories(transformedCategories);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load categories")
        );
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
