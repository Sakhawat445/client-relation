"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Button from "../button/Button";
import CustomerList from "./CustomerList";
import CustomerModal from "../customerModal/Modal";

const NewCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 5; // Total number of page buttons

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
            type="button"
            title="Previous Page"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <ChevronRight className="rotate-180" />
          </button>
          <button
            type="button"
            title="Next Page"
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

      <CustomerList currentPage={currentPage} itemsPerPage={6} />

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default NewCustomers;
