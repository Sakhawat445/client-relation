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
    <>
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar: always visible on all screens, fixed width */}
      <aside className="w-full md:w-[250px] ">
        <Sidebar />      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Summary cards - single column on small screens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TotalCustomers />
            <NewCustomer />
            <Member />
            <NonMember />
          </div>

          {/* DeviceStats - full width */}
          <div>
            <DeviceStats />
          </div>

          {/* CustomerDemographics - full width */}
          <div>
            <CustomerDemographics />
          </div>

          {/* Customer table section */}
          <div>
            <CustomerDetails />
          </div>
        </main>

        {/* Footer */}
      </div>
    </div>
    <Footer />
    </>
  );
}