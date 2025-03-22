"use client";

import React from "react";
import SalesHistoryList from "./SalesHistoryList";
import { useCustomerList } from "../newCustomer/useCustomerList";

const SalesHistory: React.FC = () => {
  const { customers = [], status, error } = useCustomerList();

  if (status === "loading") return <p>Loading sales history...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Sales History</h2>
      <p className="text-sm text-gray-500 mb-2">RECENT</p>

      <ul>
        {customers.map((customer) => (
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
