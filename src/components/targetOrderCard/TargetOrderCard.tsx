
import React from "react";
import { useTotalOrders } from "./useTargetOrder"; // Ensure correct path

const TotalOrderCard: React.FC = () => {
  const { totalOrders, completedOrders } = useTotalOrders(); // Get both values

  // Calculate percentage
  const percentage = totalOrders > 0 ? Math.min((completedOrders / totalOrders) * 100, 100) : 0;

  return (
    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl text-white w-50 h-70 ml-[-50px]">
      <div className="relative flex items-center justify-center w-26 h-26 mx-auto">
        <svg className="absolute w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="38%"
            stroke="white"
            strokeWidth="6"
            fill="none"
            className="opacity-30"
          />
          <circle
            cx="50%"
            cy="50%"
            r="38%"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={`${100 - percentage}`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <span className="absolute text-lg font-semibold">{Math.round(percentage)}%</span>
      </div>
      <p className="text-center mt-2 text-xl font-bold">
        {completedOrders.toLocaleString()}/
        <span className="text-gray-300">{totalOrders.toLocaleString()}</span>
      </p>
      <p className="text-center text-gray-200 text-sm">Completed Orders</p>
    </div>
  );
};

export default TotalOrderCard;
