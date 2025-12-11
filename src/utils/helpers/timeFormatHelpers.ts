export function formatTimeForAPI(time: string): string {
  if (!time) return time;

  const parts = time.split(":");

  if (parts.length === 2) {
    return `${time}:00`;
  }

  return time;
}

export function parseTimeFromAPI(time: string): string {
  if (!time) return time;

  const parts = time.split(":");

  if (parts.length === 3) {
    return `${parts[0]}:${parts[1]}`;
  }

  return time;
}
