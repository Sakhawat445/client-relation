"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useSalesData } from "./useSalesStatistic";

const SalesStatistic = () => {
  const { totalRevenue, totalSales, data } = useSalesData();

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-170 ">
      <h2 className="text-lg font-semibold">Sales Statistic</h2>
      <div className="flex justify-between text-center mt-4">
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
          <h3 className="text-xl font-bold text-purple-600">4576</h3>
          <span className="text-sm text-gray-400">Views</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3182CE" strokeWidth={2} dot={false} name="Total Revenue" />
            <Line type="monotone" dataKey="sales" stroke="#38A169" strokeWidth={2} dot={false} name="Total Sales" />
            <Line type="monotone" dataKey="views" stroke="#805AD5" strokeWidth={2} dot={false} name="Total Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesStatistic;
