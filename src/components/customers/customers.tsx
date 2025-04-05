'use client';

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
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 transition-all duration-300 ">
        {/* Header */}
        <Header />

        <main className="p-6 flex-1 space-y-6">
          {/* Page Title + Date + Avatar (if needed) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* optionally a date picker or avatar */}
          </div>

          {/* Top summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TotalCustomers />
            <NewCustomer />
            <Member />
            <NonMember />
          </div>

          {/* Device stats + Demographics */}
              <DeviceStats />
              <CustomerDemographics />

          {/* Full-width customer table */}
            <CustomerDetails />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
