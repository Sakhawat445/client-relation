"use client";

import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useSalesPerWeek from "./useSalesPerWeek";

const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
const startOfWeek = new Date(currentDate);
startOfWeek.setDate(currentDate.getDate() - daysToMonday);
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
    <div className="w-full max-w-5xl mx-auto bg-gray-50 p-5 rounded-md shadow-sm mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales per Week</h2>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <HeatMap
            width={600}
            height={300}
            rectSize={40}
            space={8}
            value={heatmapData}
            startDate={startOfWeek}
            panelColors={{
              0: "#f2f2f2",
              500: "#d9c7e6",
              1000: "#b38ed9",
              5000: "#7b4ca3",
            }}
            rectProps={{ rx: 5, ry: 5 }}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-4">
        <strong className="mr-2">Orders:</strong>
        <span className="inline-flex items-center">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#f2f2f2] mr-1"></span>
          0-500
        </span>
        <span className="inline-flex items-center">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#d9c7e6] mr-1"></span>
          501-1,000
        </span>
        <span className="inline-flex items-center">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#b38ed9] mr-1"></span>
          1,001-5,000
        </span>
        <span className="inline-flex items-center">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#7b4ca3] mr-1"></span>
          5,001-10,000
        </span>
      </div>
    </div>
  );
}
