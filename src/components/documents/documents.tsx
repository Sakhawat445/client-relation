"use client";

import React from "react";
import Sidebar from "../sideBar/SideBar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import DocumentManagement from "../documentsManagement/DocumentsManagement";

export default function Documents() {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="w-full lg:w-64 hidden lg:block">
          <Sidebar />
        </aside>

        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            <DocumentManagement />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
