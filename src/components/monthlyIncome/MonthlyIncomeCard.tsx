import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMonthlyIncome } from "./useMonthlyIncome"; // Import the custom hook

const MonthlyIncomeCard: React.FC = () => {
  const { totalIncome, percentageChange, chartData } = useMonthlyIncome();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 ml-[-180px]  w-120 h-70">
      <h3 className="text-gray-600 text-lg font-medium">Monthly Spendings</h3>
      
      <div className="flex items-center gap-2 mt-2">
        <span className="text-3xl font-bold">${totalIncome.toLocaleString()}</span>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            percentageChange >= 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
          }`}
        >
          {percentageChange >= 0 ? "▲" : "▼"} {percentageChange.toFixed(1)}%
        </span>
      </div>

      <p className="text-gray-500 text-sm">Compared to the previous month</p>

      <div className="mt-4">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart layout="vertical" data={chartData}>
            <YAxis type="category" dataKey="name" tick={{ fill: "#4A5568" }} width={40} />
            <XAxis type="number" hide />
            <Bar dataKey="value" fill="#9f7aea" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-3 text-gray-600 text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-purple-400 rounded-full"></span>
          <span>Spending Summary</span>
        </div>
        <span className="text-gray-500">Last 3 months</span>
      </div>
    </div>
  );
};

export default MonthlyIncomeCard;
