// ThinkingSearch.tsx
export async function ThinkingSearch(query: string): Promise<string[]> {
    try {
        const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            console.error("API error:", response.statusText);
            return [];
        }

        const data = await response.json();
        console.log("API:",data);
        // Lấy danh sách venue_id từ top_results
        const venueIds: string[] = data?.top_results?.map(
            (item: any) => item.venue_id
        ) || [];
        console.log("API:",venueIds);
        return venueIds;

    } catch (error) {
        console.error("Failed to call ThinkingSearch:", error);
        return [];
    }
}
