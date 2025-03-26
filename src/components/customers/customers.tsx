"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CustomerDetails from "../customersDetails/CustomersDetails";
import TotalCustomers from "../customerCard/TotalCustomer";
import NewCustomer from "../customerCard/NewCustomer";
import Member from "../customerCard/Member";
import NonMember from "../customerCard/NonMember";
import DeviceStats from "../deviceStats/DeviceStats";
import CustomerDemographics from "../customerDemographics/CustomerDemographics";

export default function Customer() {
  // Sample product data for the BestSellingProducts component
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />
<TotalCustomers />
<NewCustomer />
<Member />
<NonMember  />
<DeviceStats />
<CustomerDemographics />
<CustomerDetails />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
