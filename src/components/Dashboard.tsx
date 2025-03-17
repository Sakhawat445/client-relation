'use client';

import NewCustomers from "./Customer";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 bg-gray-100">
          <NewCustomers />
        </main>
        <Footer />
      </div>
    </div>
  );
}
