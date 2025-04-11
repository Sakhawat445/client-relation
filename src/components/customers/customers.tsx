"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import TotalCustomers from "../customerCard/TotalCustomer";
import NewCustomer from "../customerCard/NewCustomer";
import Member from "../customerCard/Member";
import NonMember from "../customerCard/NonMember";
import DeviceStats from "../deviceStats/DeviceStats";
import CustomerDemographics from "../customerDemographics/CustomerDemographics";
import CustomerDetails from "../customersDetails/CustomersDetails";

export default function Customer() {
  return (
    <div className="flex bg-gray-300 min-h-screen p-5">
      {/* Sidebar: hidden on small screens, visible from md up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <main className="ml-3 flex-1">
          {/* Page Title + Date + Avatar (if needed) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            {/* Optionally add a date picker or avatar here */}
          </div>

          {/* Top summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
            <TotalCustomers />
            <NewCustomer />
            <Member />
            <NonMember />
          </div>

          {/* Device stats and Demographics in a responsive grid */}
            <DeviceStats />
            <CustomerDemographics />
          

          {/* Full-width customer details */}
          <div className="mb-7">
            <CustomerDetails />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-10 w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
