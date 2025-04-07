"use client";

import React, { useState } from "react";
import { useCustomerList } from "../newCustomer/useCustomerList";
import CustomerRow from "./CustomerRow";
import { Customer } from "@/types/types";
import CustomerModal from "../customerModal/Modal";
import Button from "../button/Button";

const CustomerList: React.FC = () => {
  const { customers = [], status, error } = useCustomerList();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Pagination state ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedCustomers = customers.slice(startIdx, endIdx);

  // Select customer when checkbox is checked
  const handleSelect = (id: string) => {
    console.log("Selected Customer ID:", id);
    const customer = customers.find((c) => c.id === id) || null;
    setSelectedCustomer(customer);
  };
  // Open modal in edit mode when Edit button is clicked
  const handleEdit = () => {
    if (selectedCustomer) {
      setIsModalOpen(true);
    }
  };

  // Close modal and reset selection
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  if (status === "loading") return <p>Loading customers...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full space-y-3">
      {/* Edit Button */}
      <Button onClick={handleEdit} className="mb-4" disabled={!selectedCustomer}>
        Edit
      </Button>

      {/* Customer List */}
      {paginatedCustomers.map((customer) => (
        <CustomerRow 
          key={customer.id} 
          customer={customer} 
          onSelect={() => handleSelect(customer.id ?? "")}
          isSelected={selectedCustomer?.id === customer.id} 
        />
      ))}

      {/* Pagination Controls */}
      {customers.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            Showing {startIdx + 1} to {Math.min(endIdx, customers.length)} of {customers.length} entries
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage ? "bg-purple-600 text-white" : "bg-white border"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isModalOpen && selectedCustomer && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isDocumentModal={false}
          doc={selectedCustomer}
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default CustomerList;
