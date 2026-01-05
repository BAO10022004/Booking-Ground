export function calculateHours(startTime: string, endTime: string): number {
  const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  return end - start;
}

export function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  } else if (wholeHours === 0) {
    return `${minutes}p`;
  } else {
    return `${wholeHours}h${minutes}`;
  }
}

