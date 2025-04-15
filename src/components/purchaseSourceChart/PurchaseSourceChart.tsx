"use client";
import { PurchaseSource } from "@/types/types";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data: PurchaseSource[] = [
  { name: "Social Media", value: 49, color: "#4285F4" },
  { name: "Direct Search", value: 36, color: "#34A853" },
  { name: "Others", value: 15, color: "#FB534A" },
];
export default function PurchaseSourceChart() {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow mx-auto mt-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        Source of Purchases
      </h3>

      <div className="w-full h-64 relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              blendStroke
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
            >
              {`${total}%`}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center mb-1"
          >
            <div className="flex items-center">
              <div className="colorBullet" />
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
