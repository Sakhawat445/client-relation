import { FC } from "react";
import { Line } from "react-chartjs-2";
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
import { StatsCardProps } from "@/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StatsCard: FC<StatsCardProps> = ({
  title,
  amount,
  percentage,
  isPositive,
  chartData,
  icon,
  bgColor,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-full sm:max-w-sm md:max-w-md border border-gray-200 mt-6">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${bgColor}`}>{icon}</div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-2xl font-bold text-gray-900">{amount}</h2>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? `↑ ${percentage}` : `↓ ${percentage}`}
        </span>
      </div>

      <div className="mt-3">
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default StatsCard;
