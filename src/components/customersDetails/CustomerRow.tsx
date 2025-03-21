"use client";

import React from "react";
import Image from "next/image";
import { Customer } from "@/types/types";
interface CustomerProps {
    customer: Customer;
}


const CustomerRow: React.FC<CustomerProps> = ({ customer }) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-full">
      {/* Checkbox */}
      <input type="checkbox" className="mr-3" />

      {/* Profile Image & Name */}
      <div className="flex items-center gap-3 flex-1">
        <Image
          src={customer.imageURI || "/default-avatar.png"}
          alt={customer.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="font-medium text-gray-700">{customer.name}</p>
      </div>

      {/* Email */}
      <p className="text-gray-500 flex-1">{customer.email}</p>

      {/* Phone */}
      <p className="text-gray-500 flex-1">{customer.contactNumber}</p>

      {/* Address */}
      <p className="text-gray-500 flex-1">{customer.address}</p>

      {/* Status Badge */}
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          customer.status === "Online"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {customer.status}
      </span>
    </div>
  );
};

export default CustomerRow;
