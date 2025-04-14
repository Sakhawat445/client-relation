"use client";

import React from "react";
import { FaUserPlus } from "react-icons/fa";
import StatsCard from "@/components/statsCard/StatsCard";
import { useCustomerStats } from "./useCustomerStats";  

const CustomerStatsCard: React.FC = () => {
  const { totalCustomers, chartData } = useCustomerStats();

  return (
    <StatsCard
      title="New Customers"
      amount={totalCustomers.toLocaleString()} 
      chartData={chartData} 
      icon={<FaUserPlus className="text-white" />}
      bgColor="bg-purple-500" 
      percentage="10%"        
      isPositive={true}       
    />
  );
};

export default CustomerStatsCard;
