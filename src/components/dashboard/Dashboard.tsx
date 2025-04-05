'use client';

import React from 'react';
import Sidebar from '../sideBar/SideBar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import BestSellingProducts from '../product/BestSellingProduct';
import NewCustomers from '../newCustomer/NewCustomer';
import TargetOrdersCard from '../targetOrderCard/TargetOrderCard';
import MonthlyIncomeCard from '../monthlyIncome/MonthlyIncomeCard';
import { FaChartLine } from 'react-icons/fa';
import { MdMoneyOff } from 'react-icons/md';
import StatsCard from '@/components/statsCard/StatsCard';
import CustomerStatsCard from '../customerStatsCard/CustomerStatsCard';
import CityOrderMap from '../cityOrderMap/CityOrderMap';
import { useSidebar } from '../sideBar/useSideBar';

export default function Dashboard() {
  const { isOpen } = useSidebar(); // Reflects sidebar toggle state

  const profitChartData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'July'],
    datasets: [{ data: [100, 200, 150, 300, 250], borderColor: 'green', fill: false }],
  };
  const expensesChartData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'July'],
    datasets: [{ data: [300, 250, 400, 350, 500], borderColor: 'red', fill: false }],
  };

  const stats = {
    profit: 3930, // Updated to match the image
    expenses: 1467, // Updated to match the image
    customers: 1000, // Updated to match the image
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content wrapper */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? 'md:ml-64' : 'md:ml-16'
        }`}
      >
        {/* Top Header */}
        <Header />

        {/* Dashboard content */}
        <main className=" md:p-6 flex-1 ">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <TargetOrdersCard />
            <MonthlyIncomeCard />
            <BestSellingProducts />
          </div>

          {/* Second Row */}
          
<div className="flex-1 grid grid-cols-1 md:grid-cols-3 -ml-90 mr-70 p-48 gap-65 ml-x-[-280px] -mt-50">
  <StatsCard
    title="Total Profit"
    amount={`$${stats.profit.toLocaleString()}`}
    percentage="3.4%"
    isPositive={true}
    chartData={profitChartData}
    icon={<FaChartLine className="text-white" />}
    bgColor="bg-purple-500"
  />
  <StatsCard
    title="Total Expenses"
    amount={`$${stats.expenses.toLocaleString()}`}
    percentage="2.6%"
    isPositive={false}
    chartData={expensesChartData}
    icon={<MdMoneyOff className="text-white" />}
    bgColor="bg-red-500"
  />
  <CustomerStatsCard />
</div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <NewCustomers />
            </div>
              <CityOrderMap />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}