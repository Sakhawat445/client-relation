"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductOrder from "../productOder/ProductOder";

export default function Order() {
  // Sample product data for the BestSellingProducts component
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Top header */}
        <Header />
<ProductOrder />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
