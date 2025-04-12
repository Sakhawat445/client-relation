import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

const MonthlyIncomeCard: React.FC = () => {
  const totalIncome = 6567;
  const percentageChange = 5.6;
  const chartData = [
    { name: "May", value: 3500, fill: "#EF4444" },
    { name: "June", value: 4500, fill: "#3B82F6" },
    { name: "Jul", value: 6567, fill: "#8B5CF6" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:w-[470px] w-full md:ml-[-130px] border border-gray-200 ">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Monthly Income
      </h3>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Section */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${totalIncome.toLocaleString()}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Compared to the previous month
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium ${
                percentageChange >= 0
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              <ArrowUpRight size={12} />
              {percentageChange.toFixed(1)}%
            </span>
          </div>

          {/* Accounting Info */}
          <div className="flex items-center gap-2 text-gray-600 text-xs mt-4 border-t pt-3">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 7h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
            </span>
            <div>
              <h4 className="text-xs font-medium">Accounting</h4>
              <p className="text-[10px] text-gray-500">
                July 1 – July 31, 2023
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Chart) */}
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart layout="vertical" data={chartData}>
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 10 }}
                width={55}
              />
              <XAxis type="number" hide />
              <Bar dataKey="value" barSize={14}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeCard;
