"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductOrder from "../productOder/ProductOder";
import SalesStatistic from "../salesStatistic/SalesStatistic";
import CountrySalesStatistics from "../countrySales/CountrySalesStatistics";

export default function Order() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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
        <Footer />
      </div>
    </div>
  );
}
