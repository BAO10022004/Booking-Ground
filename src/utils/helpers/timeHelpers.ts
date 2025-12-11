export function getTimePeriodVenue(venue: any): string {
  return venue?.operatingTime || "N/A";
}

export function formatTime(time: string): string {
  return time;
}
