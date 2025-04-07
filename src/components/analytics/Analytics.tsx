"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SalesHistory from "../salesHistory/SalesHistory";
import SalesChart from "../salesChart/SalesChart";
import ContributionChart from "../contibutionChart/ContributionChart";
import CountrySalesChart from "../countrySalesChart/CountrySalesChart";
import VisitorsChart from "../visitorsChart/VisitorsChart";
import PurchaseSourceChart from "../purchaseSourceChart/PurchaseSourceChart";

export default function Analytics() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />

        {/* Main Content */}
          {/* Title Row (Optional if you want a separate title + date range + user info) */}
         

          {/* Row 1: Overall Sales & Visitors */}
            <SalesChart />
            <VisitorsChart />

          {/* Row 2: Source of Purchases & Sales per Week */}
            <PurchaseSourceChart />
            <ContributionChart />

          {/* Row 3: Sales per Country & Sales History */}
            <CountrySalesChart />
            <SalesHistory />
         

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
