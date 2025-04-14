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
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-4 sm:p-6 space-y-6">
            {/* Row 1: Sales Chart + Visitors */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <div>
                <VisitorsChart />
              </div>
            </div>

            {/* Row 2: Purchase Source + Contribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <PurchaseSourceChart />
              </div>
              <div className="lg:col-span-2">
                <ContributionChart />
              </div>
            </div>

            {/* Row 3: Country Sales + Sales History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CountrySalesChart />
              </div>
              <div>
                <SalesHistory />
              </div>
            </div>
          </main>

        </div>
      </div>
          <Footer />
    </>
  );
}
