"use client";

import React, { useState } from "react";
import { useCustomerList } from "./useSalesHistory";
import SalesHistoryList from "../salesHistoryList/SalesHistoryList";

const SalesHistory: React.FC = () => {
  const { customers = [], status, error } = useCustomerList();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(customers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  if (status === "loading") return <p>Loading sales history...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Sales History</h2>
      <p className="text-sm text-gray-500 mb-4">RECENT</p>

      {/* Pagination Bar */}
      <div className="flex flex-wrap justify-center items-center mb-4 gap-2">
        {/* Left Arrow */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300
                     bg-white text-purple-500 disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Numbered Buttons */}
        {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 text-sm font-medium rounded-md border
                ${
                  currentPage === pageNumber
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-purple-500 border-gray-300"
                }`}
            >
              {pageNumber}
            </button>
          )
        )}

        {/* Right Arrow */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300
                     bg-white text-purple-500 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {/* Customer List */}
      <ul className="space-y-4">
        {currentCustomers.map((customer) => (
          <SalesHistoryList
            key={customer.id}
            name={customer.name}
            country={customer.address}
            amount={customer.spendings || 0}
            image={customer.imageURI || "/default-image.png"}
          />
        ))}
      </ul>
    </div>
  );
};

export default SalesHistory;
