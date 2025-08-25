// import type { ReportForm } from "@/type/report";

export function converToCSV(data) {
  const headers = Object.keys(data[0]);

  const rows = data.map((row: string | number) =>
    headers.map((fields) => JSON.stringify(fields[row] ?? "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
