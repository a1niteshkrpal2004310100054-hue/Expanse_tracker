import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "20%",
};

interface DoughnutChartProp {
  data: ChartData<"doughnut", number[], unknown>;
}

export function DoughnutChart({ data }: DoughnutChartProp) {
  return <Doughnut data={data} options={options} />;
}
