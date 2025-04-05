import React from "react";
import { FaUserPlus } from "react-icons/fa";
import StatsCard from "@/components/statsCard/StatsCard";
import { useCustomerStats } from "./useCustomerStats"; // Custom hook to fetch customer stats 

const CustomerStatsCard: React.FC = () => {
  const { totalCustomers, chartData } = useCustomerStats(); // Fetch total customers and chart data

  return (
    <StatsCard
      title="New Customers" // Updated to match the image
      amount={totalCustomers.toLocaleString()} // Format with commas (e.g., 1,000)
      chartData={chartData} // Pass chart data
      icon={<FaUserPlus className="text-white" />}
      bgColor="bg-purple-500" // Updated to match the purple icon background in the image
      percentage="10%" // Updated to match the +10% in the image
      isPositive={true} // The percentage is positive in the image
    />
  );
};

export default CustomerStatsCard;