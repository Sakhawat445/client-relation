"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../button/Button";
import CustomerList from "./CustomerList";
import CustomerModal from "./Modal";

const NewCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 5;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Customers</h2>
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {loading ? "Adding new customer..." : "New Customer"}
          </Button>
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="bg-gray-100 rounded-md p-2 mb-2">
        <table className="w-full text-left text-gray-600 text-sm">
          <thead>
            <tr className="bg-purple-100 text-gray-700 rounded-md">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Total</th>
            </tr>
          </thead>
        </table>
      </div>
      <CustomerList />
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default NewCustomers;
