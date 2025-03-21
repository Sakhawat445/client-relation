"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CustomerDetails from "../customersDetails/CustomersDetails";

export default function Customer() {
  // Sample product data for the BestSellingProducts component
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />
<CustomerDetails />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
