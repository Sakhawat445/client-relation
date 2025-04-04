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
      {customers.map((customer) => (
  <CustomerRow 
    key={customer.id} 
    customer={customer} 
    onSelect={() => handleSelect(customer.id ?? "")}
    isSelected={selectedCustomer?.id === customer.id} 
  />
))}

      {/* Edit Customer Modal */}
      {isModalOpen && selectedCustomer && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isDocumentModal={false}
          doc={selectedCustomer}  // Pass selected customer data
          isEditMode={true}  // Indicate it's edit mode
        />
      )}
    </div>
  );
};

export default CustomerList;
