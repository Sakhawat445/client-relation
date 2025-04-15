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
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        <aside className="w-full md:w-[250px] ">
          <Sidebar />{" "}
        </aside>

        <div className="flex flex-col flex-1">
          <Header />

          <main className="p-4 sm:p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <TotalCustomers />
              <NewCustomer />
              <Member />
              <NonMember />
            </div>

            <div>
              <DeviceStats />
            </div>

            <div>
              <CustomerDemographics />
            </div>

            <div>
              <CustomerDetails />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
