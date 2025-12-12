import { API_CONFIG, API_ENDPOINTS } from "../config/api";

export async function ThinkingSearch(query: string): Promise<string[]> {
  try {
    const baseUrl = API_CONFIG.BASE_URL.replace("/api", "");
    const response = await fetch(
      `${baseUrl}${API_ENDPOINTS.THINKING_SEARCH.PREDICT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      console.error("ThinkingSearch API error:", response.statusText);
      return [];
    }

    const data = await response.json();
    // Lấy danh sách venue_id từ top_results
    const venueIds: string[] =
      data?.top_results?.map((item: any) => item.venue_id) || [];

    return venueIds;
  } catch (error) {
    console.error("Failed to call ThinkingSearch:", error);
    return [];
  }
}
