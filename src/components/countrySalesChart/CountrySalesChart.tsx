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

  const maxOrders = Math.max(...orderData.map((d) => d.orders || 0), 100);
  const tickInterval = 25;
  const ticks = Array.from(
    { length: Math.ceil(maxOrders / tickInterval) + 1 },
    (_, i) => i * tickInterval
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-md shadow p-5 mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Orders per Country{" "}
        <span className="text-gray-500">
          ({totalOrders.toLocaleString()} Orders)
        </span>
      </h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={orderData} margin={{ left: 20 }}>
            <XAxis
              type="number"
              tickFormatter={(value) => value.toLocaleString()}
              ticks={ticks}
              domain={[0, maxOrders]}
              interval={0}
            />
            <YAxis dataKey="country" type="category" width={100} />
            <Tooltip formatter={(value) => `${value.toLocaleString()} Orders`} />
            <Bar dataKey="orders" fill="#4A90E2" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
