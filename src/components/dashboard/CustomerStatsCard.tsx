import React from "react";
import { FaUserPlus } from "react-icons/fa";
import StatsCard from "@/components/statsCard/StatsCard";
import { useCustomerStats } from "./useCustomerStats";

const CustomerStatsCard: React.FC = () => {
  const { totalCustomers, chartData } = useCustomerStats(); // Fetch total customers and chart data

  return (
    <StatsCard
      title="Total Customers"
      amount={totalCustomers.toString()} // Show total customers
      chartData={chartData} // Pass chart data
      icon={<FaUserPlus className="text-white" />}
      bgColor="bg-blue-500"
      percentage={(totalCustomers / 100) * 100} // Example percentage calculation
      isPositive={totalCustomers > 0} // Check if there are customers
    />
  );
};

export default CustomerStatsCard;
