import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSalesData } from "./useSalesChart";

const SalesChart = () => {
  const { salesData, totalSales, percentageChange } = useSalesData();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-3xl mx-auto">
      {/* Overall Sales Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Overall Sales</h2>
          <p className="text-3xl font-bold">${totalSales.toLocaleString()}</p>
        </div>
        <span
          className={`mt-2 sm:mt-0 text-sm px-2 py-1 rounded ${
            percentageChange > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {percentageChange.toFixed(1)}%
        </span>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="#8854d0"
            strokeWidth={2}
            dot={{ r: 5 }}
            name="Current Week"
          />
          <Line
            type="monotone"
            dataKey="lastWeek"
            stroke="#3498db"
            strokeWidth={2}
            dot={{ r: 5 }}
            name="Last Week"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
