"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductOrder from "../productOder/ProductOder";
import SalesStatistic from "../salesStatistic/SalesStatistic";
import CountrySalesStatistics from "../countrySales/CountrySalesStatistics";
import { useSidebar } from "../sideBar/useSideBar";

export default function Order() {
    useSidebar(); // Reflects sidebar toggle state
  
  return (
    <div className="flex h-full bg-gray-300">
      {/* Sidebar */}
      <div className="mt-6 ml-[-20px]">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />

        {/* Main Content */}

          {/* Create a two-column grid */}
          {/* Left Column */}
            <div className="mb-4 ml-6">
              <SalesStatistic />
              <ProductOrder />
            </div>

            {/* Right Column */}
              <CountrySalesStatistics />


        {/* Footer */}
       <div className="ml-20 mt-100">
        <Footer />
</div>

      </div>
    </div>
  );
}
