import React from "react";
import { useTotalOrders } from "./useTargetOrder"; // Ensure correct path

const TotalOrderCard: React.FC = () => {
  const { totalOrders, completedOrders } = useTotalOrders(); // Get both values

  // Calculate percentage
  const percentage = totalOrders > 0 ? Math.min((completedOrders / totalOrders) * 100, 100) : 0;

  return (
    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl text-white w-full md:w-[200px] h-auto mx-auto  sm:h-[260px] md:h-[280px]  md:ml-[2]">
      <div className="relative flex items-center justify-center w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28 mx-auto">
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
        <span className="absolute text-base sm:text-lg font-semibold">{Math.round(percentage)}%</span>
      </div>
      <p className="text-center mt-2 text-lg sm:text-xl font-bold">
        {completedOrders.toLocaleString()}/
        <span className="text-gray-300">{totalOrders.toLocaleString()}</span>
      </p>
      <p className="text-center text-gray-200 text-sm sm:text-base">Completed Orders</p>
    </div>
  );
};

export default TotalOrderCard;
