import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Data } from "@/type";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "20%",
};

export function DoughnutChart({ data }: { data: Data }) {
  return <Doughnut data={data} options={options} />;
}
