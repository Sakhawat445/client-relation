"use client";

import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import BestSellingProducts from "./BestSellingProduct";
import NewCustomers from "./Customer";

export default function Dashboard() {
  // Sample product data for the BestSellingProducts component
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />

        {/* Main section: scrollable content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* KPI Card 1 */}
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-semibold">$8,393</p>
            </div>
            {/* KPI Card 2 */}
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Profit</p>
              <p className="text-xl font-semibold">$6,667</p>
            </div>
            {/* KPI Card 3 */}
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Awareness</p>
              <p className="text-xl font-semibold">1,467</p>
            </div>
            {/* KPI Card 4 */}
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-xl font-semibold">234</p>
            </div>
          </div>

          {/* Middle Row: Charts & Best Selling Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Analytics Overview / Charts (occupies 2 columns) */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold mb-2">Analytics Overview</h3>
              {/* Placeholder for charts or analytics components */}
              <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart / Graph Goes Here</p>
              </div>
            </div>

            {/* Best Selling Products (occupies 1 column) */}
            <div className="col-span-1">
              <BestSellingProducts />
            </div>
          </div>

            {/* New Customers */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold mb-2">New Customers</h3>
              <NewCustomers />
            </div>

          
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
