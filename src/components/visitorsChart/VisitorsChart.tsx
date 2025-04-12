import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface VisitorsData {
  date: string;
  visitors: number;
}

// Example data (replace with your real data)
const data: VisitorsData[] = [
  { date: "1 Jul", visitors: 5000 },
  { date: "2 Jul", visitors: 8000 },
  { date: "3 Jul", visitors: 7000 },
  { date: "4 Jul", visitors: 6000 },
  { date: "5 Jul", visitors: 7500 },
  { date: "6 Jul", visitors: 9487 }, // Highest day
  { date: "7 Jul", visitors: 8500 },
];

export default function VisitorsChart() {
  // Find the maximum visitor count
  const maxValue = Math.max(...data.map((item) => item.visitors));

  /**
   * Custom label component for the bar.
   * Only shows a label for the bar with the max value.
   */
  interface CustomBarLabelProps {
    x: number;
    y: number;
    width: number;
    value: number;
  }

  const CustomBarLabel = (props: CustomBarLabelProps) => {
    const { x, y, width, value } = props;
    // If this bar is the max bar, show a label above it
    if (value === maxValue) {
      return (
        <text
          x={x + width / 2}
          y={y - 10}
          fill="#fff"
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
        >
          {value.toLocaleString()}
        </text>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mx-auto w-full max-w-lg my-4">
      <h3 className="mb-5 text-xl font-semibold text-center">Visitors</h3>

      {/* Responsive container keeps the chart flexible */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(val) => val.toLocaleString()} />
          <Tooltip formatter={(value: number) => `${value.toLocaleString()} Visitors`} />

          <Bar dataKey="visitors" radius={[5, 5, 0, 0]} label={(props) => <CustomBarLabel {...props} />}>
            {/* Dynamically color each bar; highlight the max one */}
            {data.map((entry, index) => {
              const isMax = entry.visitors === maxValue;
              return (
                <Cell key={`cell-${index}`} fill={isMax ? "#48BB78" : "#BBF7D0"} />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-5 bg-gray-200 p-2 rounded text-center">
        <strong>Awesome!</strong> You just hit a new record!
      </div>
    </div>
  );
}
