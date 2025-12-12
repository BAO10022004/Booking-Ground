export function getImageUrl(imageId: string | null | false): string {
  if (!imageId) return "";
  return `/storage/images/${imageId}`;
}

export function getFullImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${
    import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
    "http://localhost:8000"
  }${imageUrl}`;
}
