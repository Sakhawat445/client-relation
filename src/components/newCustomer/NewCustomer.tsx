"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Button from "../button/Button";
import CustomerModal from "../customerModal/Modal";
import CustomerList from "../NewCustomerList/CustomerList";

const NewCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 5;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-full sm:max-w-3xl md:max-w-5xl mx-auto mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">New Customers</h2>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
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

      {/* Table Header */}
      <div className="overflow-x-auto rounded-md p-2 mb-2">
        <table className="min-w-full text-left  text-sm">
          <thead>
            <tr className="bg-purple-100 text-gray-700">
              <th className="py-2 px-3 whitespace-nowrap">Date</th>
              <th className="py-2 px-3 whitespace-nowrap">Customer</th>
              <th className="py-2 px-3 whitespace-nowrap">Status</th>
              <th className="py-2 px-3 whitespace-nowrap">Total</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Customer List */}
      <CustomerList currentPage={currentPage} itemsPerPage={6} />

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === page ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal */}
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default NewCustomers;
