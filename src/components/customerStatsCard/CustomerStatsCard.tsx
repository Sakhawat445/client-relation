"use client";

import React from "react";
import { FaUserPlus } from "react-icons/fa";
import StatsCard from "@/components/statsCard/StatsCard";
import { useCustomerStats } from "./useCustomerStats"; // Adjust path as needed

const CustomerStatsCard: React.FC = () => {
  const { totalCustomers, chartData } = useCustomerStats(); // Fetch total customers & chart data

  return (
    <StatsCard
      title="New Customers"
      amount={totalCustomers.toLocaleString()} // e.g. "1,000"
      chartData={chartData} 
      icon={<FaUserPlus className="text-white" />}
      bgColor="bg-purple-500" // Purple background for the icon circle
      percentage="10%"        // e.g. "+10%"
      isPositive={true}       // The arrow/text is shown in green
    />
  );
};

export default CustomerStatsCard;
