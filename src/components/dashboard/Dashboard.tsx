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
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/2">
      <TargetOrdersCard />
    </div>
    <div className="w-full mt-4 md:mt-0">
      <MonthlyIncomeCard />
    </div>
  </div>
</div>

            <div className="lg:row-span-2 overflow-x-auto lg:overflow-visible">
              <BestSellingProducts />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TotalProfitCard />
              <TotalExpensesCard />
              <CustomerStatsCard />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 overflow-x-auto lg:overflow-visible">
              <NewCustomers />
            </div>
            <div>
              <CityOrderMap />
            </div>
          </div>
        </main>

      
      </div>
    </div>
        <Footer />
    </>
  );
}