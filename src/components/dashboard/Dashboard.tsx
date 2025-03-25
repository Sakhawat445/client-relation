"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BestSellingProducts from "../product/BestSellingProduct";
import NewCustomers from "../newCustomer/NewCustomer";
import TargetOrdersCard from "../targetOrderCard/TargetOrderCard";
import MonthlyIncomeCard from "../monthlyIncome/MonthlyIncomeCard";
import { FaChartLine } from "react-icons/fa";
import { MdMoneyOff } from "react-icons/md";
import StatsCard from "@/components/statsCard/StatsCard";
import CustomerStatsCard from "./CustomerStatsCard";

export default function Dashboard() {
  // Sample data for stats cards
  const profitChartData = {
    labels: ["Mar", "Apr", "May", "Jun", "July"],
    datasets: [{ data: [100, 200, 150, 300, 250], borderColor: "green", fill: false }],
  };
  const expensesChartData = {
    labels: ["Mar", "Apr", "May", "Jun", "July"],
    datasets: [{ data: [300, 250, 400, 350, 500], borderColor: "red", fill: false }],
  };

  const stats = {
    profit: 1000,
    expenses: 500,
    customers: 120,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />

        {/* Dashboard content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Key Stats Cards */}
            <TargetOrdersCard />
            <MonthlyIncomeCard />
            <CustomerStatsCard />
          </div>

          {/* Middle Section with Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <StatsCard
              title="Total Profit"
              amount={`$${stats.profit}`}
              percentage="3.4%"
              isPositive={true}
              chartData={profitChartData}
              icon={<FaChartLine className="text-white" />}
              bgColor="bg-purple-500"
            />
            <StatsCard
              title="Total Expenses"
              amount={`$${stats.expenses}`}
              percentage="2.6%"
              isPositive={false}
              chartData={expensesChartData}
              icon={<MdMoneyOff className="text-white" />}
              bgColor="bg-red-500"
            />
          </div>

          {/* Bottom Section with Best Selling Products & New Customers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <BestSellingProducts />
            <NewCustomers />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
