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
      <div className=" md:w-64 ">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <Header />

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 p-6">
          <div className="md:col-span-2 flex flex-col space-y-6">
            <SalesStatistic />
            <ProductOrder />
          </div>

          <div>
            <CountrySalesStatistics />
          </div>
        </div>

      </div>
    </div>
          <Footer />
    </>
  );
}
