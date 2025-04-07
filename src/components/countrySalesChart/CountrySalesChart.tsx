"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useCountryOrderChart from "./useCountrySaleChart";

export default function CountryOrdersChart() {
  const orderData = useCountryOrderChart();
  const totalOrders = orderData.reduce(
    (acc, item) => acc + (item.orders || 0),
    0
  );

  // Get max orders value for setting the X-axis domain dynamically
  const maxOrders = Math.max(...orderData.map((d) => d.orders || 0), 100);
  const tickInterval = 25;
  const ticks = Array.from(
    { length: Math.ceil(maxOrders / tickInterval) + 1 },
    (_, i) => i * tickInterval
  );

  console.log("ticks:", ticks);
  console.log("orderData:", orderData);

  return (
    <div className="border rounded-md p-5 bg-white shadow- w-160 mt-5 ml-5  ">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Orders per Country{" "}
        <span className="text-gray-500">
          ({totalOrders.toLocaleString()} Orders)
        </span>
      </h2>
      <div className="flex items-center h-95 w-full ">
        <ResponsiveContainer width="50%">
          <BarChart layout="vertical" data={orderData} margin={{ left: 20 }}>
            <XAxis
              type="number"
              tickFormatter={(value) => value.toLocaleString()}
              ticks={ticks}
              domain={[0, maxOrders]} // Use maxOrders dynamically instead of fixed [0, 100]
              interval={0}
            />
            <YAxis dataKey="country" type="category" />
            <Tooltip formatter={(value) => `${value.toLocaleString()} Orders`} />
            <Bar dataKey="orders" fill="#4A90E2" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
