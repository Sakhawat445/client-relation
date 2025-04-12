"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { useSalesData } from "./useSalesStatistic";

const SalesStatistic = () => {
  const { totalRevenue, totalSales, data } = useSalesData();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Sales Statistic</h2>

      {/* Totals Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</h3>
          <span className="text-sm text-gray-400">Orders</span>
        </div>
        <div>
          <p className="text-gray-500">Total Sales</p>
          <h3 className="text-xl font-bold text-green-600">{totalSales.toLocaleString()}</h3>
          <span className="text-sm text-gray-400">Products</span>
        </div>
        <div>
          <p className="text-gray-500">Total Views</p>
          <h3 className="text-xl font-bold text-purple-600">4,576</h3>
          <span className="text-sm text-gray-400">Views</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3182CE"
              strokeWidth={2}
              dot={false}
              name="Total Revenue"
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#38A169"
              strokeWidth={2}
              dot={false}
              name="Total Sales"
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#805AD5"
              strokeWidth={2}
              dot={false}
              name="Total Views"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesStatistic;
