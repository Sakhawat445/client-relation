import React from 'react';
import StatsCard from '@/components/statsCard/StatsCard';
import { FaChartLine } from 'react-icons/fa';

const TotalProfitCard = () => {
  const profitChartData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'July'],
    datasets: [
      {
        data: [100, 200, 150, 300, 250],
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const profit = 3930;

  return (
    <StatsCard
      title="Total Profit"
      amount={`$${profit.toLocaleString()}`}
      percentage="3.4%"
      isPositive={true}
      chartData={profitChartData}
      icon={<FaChartLine className="text-white" />}
      bgColor="bg-purple-500"
    />
  );
};

export default TotalProfitCard;
