export function formatDate(date: string) {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
