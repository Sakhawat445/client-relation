"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface PurchaseSource {
  name: string;
  value: number;
  color: string;
}

// Example data (must total 100 for 100% center text)
const data: PurchaseSource[] = [
  { name: "Social Media", value: 49, color: "#4285F4" },
  { name: "Direct Search", value: 36, color: "#34A853" },
  { name: "Others", value: 15, color: "#FB534A" },
];

export default function PurchaseSourceChart() {
  // For a total of 100% in the center
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div style={{ width: 300, padding: "1rem", background: "#fff", borderRadius: 8 }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Source of Purchases</h3>

      {/* Chart container */}
      <div style={{ width: "100%", height: 200, position: "relative" }}>
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

            {/* Text in the center of the donut */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={24}
              fontWeight="bold"
            >
              {`${total}%`}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div style={{ marginTop: "1rem" }}>
        {data.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Color bullet */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  marginRight: 8,
                }}
              />
              <span style={{ fontSize: 14 }}>{item.name}</span>
            </div>
                        <span style={{ fontSize: 14, fontWeight: "bold" }}>
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
