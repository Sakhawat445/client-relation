import React from "react";
import StatsCard from "@/components/statsCard/StatsCard";
import { MdMoneyOff } from "react-icons/md";

const TotalExpensesCard = () => {
  const expensesChartData = {
    labels: ["Mar", "Apr", "May", "Jun", "July"],
    datasets: [
      {
        data: [300, 250, 400, 350, 500],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const expenses = 1467;

  return (
    <StatsCard
      title="Total Expenses"
      amount={`$${expenses.toLocaleString()}`}
      percentage="2.6%"
      isPositive={false}
      chartData={expensesChartData}
      icon={<MdMoneyOff className="text-white" />}
      bgColor="bg-red-500"
    />
  );
};

export default TotalExpensesCard;
