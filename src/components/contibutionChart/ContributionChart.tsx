"use client";

import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useSalesPerWeek from "./useSalesPerWeek";

// 1) Calculate the start of the current week (Monday)
const currentDate = new Date();
const dayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
const startOfWeek = new Date(currentDate);
startOfWeek.setDate(currentDate.getDate() - daysToMonday);

// 2) Generate labels for the 7 days (e.g., "1 Jul", "2 Jul", ...)
const weekLabels: string[] = [];
const weekDates: string[] = [];

for (let i = 0; i < 7; i++) {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + i);
  
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  weekLabels.push(`${day} ${month}`);
  weekDates.push(date.toISOString().split("T")[0].replace(/-/g, "/"));
}

export default function ContributionChart() {
  const salesData = useSalesPerWeek();

  // Convert sales data to HeatMap format
  const heatmapData = salesData.flatMap((row) => [
    { date: weekDates[0], count: row.Mon },
    { date: weekDates[1], count: row.Tue },
    { date: weekDates[2], count: row.Wed },
    { date: weekDates[3], count: row.Thu },
    { date: weekDates[4], count: row.Fri },
    { date: weekDates[5], count: row.Sat },
    { date: weekDates[6], count: row.Sun },
  ]);

  return (
    <div className="border rounded-md p-5 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales per Week</h2>

      <div className="flex items-center">
        {/* Y-axis labels */}
       
        {/* Heatmap */}
        <div className="flex flex-col">
          <HeatMap
            width={550}
            height={450}
            rectSize={50}
            space={8}
            value={heatmapData}
            startDate={startOfWeek}
            panelColors={{
              0: "#f2f2f2",
              500: "#d9c7e6",
              1000: "#b38ed9",
              5000: "#7b4ca3",
            }}
            rectProps={{
              rx: 5,
              ry: 5,
            }}
          />

          {/* X-axis labels below the heatmap */}
          
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <strong>Orders:</strong>
        <span className="inline-flex items-center ml-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#f2f2f2] mr-1"></span>
          0-500
        </span>
        <span className="inline-flex items-center ml-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#d9c7e6] mr-1"></span>
          501-1,000
        </span>
        <span className="inline-flex items-center ml-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#b38ed9] mr-1"></span>
          1,001-5,000
        </span>
        <span className="inline-flex items-center ml-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#7b4ca3] mr-1"></span>
          5,001-10,000
        </span>
      </div>
    </div>
  );
}
