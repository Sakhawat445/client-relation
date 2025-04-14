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
    <>

    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Hide sidebar on small screens, show from md and up */}
      <div className=" md:w-64 ">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main Dashboard Content */}
        {/* 
          Convert into a responsive grid:
            - On small screens (default), single column
            - From md breakpoint onward, 3 columns 
              where left section spans 2 columns, and 
              right section spans 1 column.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 p-6">
          {/* Left Column (takes 2 columns on md and above) */}
          <div className="md:col-span-2 flex flex-col space-y-6">
            <SalesStatistic />
            <ProductOrder />
          </div>

          {/* Right Column (1 column on md and above) */}
          <div>
            <CountrySalesStatistics />
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
          <Footer />
    </>
  );
}
