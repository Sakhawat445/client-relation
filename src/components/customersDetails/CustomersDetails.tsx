"use client";

import React from "react";
import { useCustomerList } from "../newCustomer/useCustomerList"; // Fetch customer data
import CustomerRow from "./CustomerRow"; // Import CustomerRow component
import { Customer } from "@/types/types";

const CustomerList: React.FC = () => {
  const { customers, status, error } = useCustomerList();

  if (status === "loading") return <p>Loading customers...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full space-y-3">
      {customers.map((customer: Customer) => (
        customer.id && <CustomerRow key={customer.id} customer={customer} />
      ))}
    </div>
  );
};

export default CustomerList;
