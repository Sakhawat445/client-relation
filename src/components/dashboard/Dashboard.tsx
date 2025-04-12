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
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* First Row: Target Orders + Monthly Income (stacked on small, grid on md+) */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TargetOrdersCard />
              <MonthlyIncomeCard />
            </div>

            {/* Best Selling Products (full width on mobile, right column on lg) */}
            <div className="lg:row-span-2">
              <BestSellingProducts />
            </div>

            {/* Second Row: Total Profit, Expenses, Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TotalProfitCard />
              <TotalExpensesCard />
              <CustomerStatsCard />
            </div>
          </div>

          {/* Bottom Section: New Customers + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <NewCustomers />
            </div>
            <div>
              <CityOrderMap />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
