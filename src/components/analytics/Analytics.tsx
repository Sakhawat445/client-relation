"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SalesHistory from "../salesHistory/SalesHistory";
import SalesChart from "../salesChart/SalesChart";

export default function analytics() {
  // Sample product data for the BestSellingProducts component
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />
<SalesChart />
        {/* Main content area */}
<SalesHistory/>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
