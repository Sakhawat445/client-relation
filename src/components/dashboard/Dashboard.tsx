"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BestSellingProducts from "../product/BestSellingProduct";
import NewCustomers from "../newCustomer/NewCustomer";
import TargetOrdersCard from "../targetOrderCard/TargetOrderCard";
import MonthlyIncomeCard from "../monthlyIncome/MonthlyIncomeCard";
import CustomerStatsCard from "../customerStatsCard/CustomerStatsCard";
import CityOrderMap from "../cityOrderMap/CityOrderMap";
import TotalProfitCard from "../totalProfitCard/TotalProfitCard";
import TotalExpensesCard from "../totalExpensesCard/TotalExpensesCard";

export default function Dashboard() {
  return (
    <>
    <div className="flex bg-gray-100 min-h-screen w-full">
      {/* Sidebar: You might add a mobile toggle inside the Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* First Row: Container for Target Orders & Monthly Income */}
            <div className="lg:col-span-2">
  <div className="flex flex-col md:flex-row">
    {/* Target Orders Card */}
    <div className="w-full md:w-1/2">
      <TargetOrdersCard />
    </div>
    {/* Monthly Income Card with margin-top only on small screens */}
    <div className="w-full mt-4 md:mt-0">
      <MonthlyIncomeCard />
    </div>
  </div>
</div>

            {/* Best Selling Products with horizontal scroll on small screens */}
            <div className="lg:row-span-2 overflow-x-auto lg:overflow-visible">
              <BestSellingProducts />
            </div>

            {/* Second Row: Total Profit, Expenses, Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TotalProfitCard />
              <TotalExpensesCard />
              <CustomerStatsCard />
            </div>
          </div>

          {/* Bottom Section: New Customers + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* New Customers with horizontal scroll on small screens */}
            <div className="lg:col-span-2 overflow-x-auto lg:overflow-visible">
              <NewCustomers />
            </div>
            <div>
              <CityOrderMap />
            </div>
          </div>
        </main>

        {/* Footer */}
      
      </div>
    </div>
        <Footer />
    </>
  );
}