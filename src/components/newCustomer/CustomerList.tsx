"use client";

import React from "react";
import Image from "next/image";
import { useCustomerList } from "./useCustomerList"; // Adjust path

const CustomerList: React.FC = () => {
  const { customers, status, error } = useCustomerList();

  if (status === "loading") return <p>Loading customers...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg p-4 w-full shadow">
      <table className="w-full border-collapse text-gray-600 text-sm">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Customer</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Spending</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
<td className="py-3 px-3">
  {new Date(customer.createdDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}
</td>              <td className="py-3 px-3 flex items-center gap-3">
                <Image
                  src={customer.imageURI || "/default-avatar.png"}
                  alt={customer.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {customer.name}
              </td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    customer.status === "Success"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {customer.status}
                </span>
              </td>
              <td className="py-3 px-3 font-semibold">${(customer.spendings ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
