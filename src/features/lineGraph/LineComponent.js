import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["15:30", "15:41", "15:52", "16:03", "16:14", "16:25", "16:36", "16:47", "16:58"];
const graphData = {
  labels: labels,
  datasets: [
    {
      label: "新宿",
      data: [65, 59, 60, 81, 56, 55,110,140,150],
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "渋谷",
      data: [60, 55, 57, 61, 75, 50,170,10,190],
      borderColor: "rgb(75, 100, 192)",
    },
    {
      label: "千葉",
      data: [40, 80, 190, 60, 200, 90],
      borderColor: "red",
    },
  ],
};

const LineComponent = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "降水量",
      },
    },
  };

  return (
    <div>
      <p></p>
      <Line options={options} data={graphData} />
    </div>
  );
}

export default LineComponent;
