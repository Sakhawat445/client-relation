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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1 */}
            <SalesChart />
            <VisitorsChart />

            {/* Row 2 */}
            <PurchaseSourceChart />
            <ContributionChart />

            {/* Row 3 */}
            <CountrySalesChart />
            <SalesHistory />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
