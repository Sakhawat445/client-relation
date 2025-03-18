'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import CustomerModal from './Modal'; // Import the modal component

type Customer = {
  date: string;
  name: string;
  image: string;
  status: 'Success' | 'Pending';
  amount: string;
};

const customers: Customer[] = [
  // Add your customer objects here if needed
];

const NewCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 4;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Customers</h2>
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full"
            // disabled={loading}
          >
            {loading ? "Adding new customer..." : "New Customer"}
          </Button>
          <button
            onClick={() => {
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            className="p-2"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => {
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            className="p-2"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <table className="w-full text-left text-gray-600 text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-2 px-2">Date</th>
            <th className="py-2 px-2">Customer</th>
            <th className="py-2 px-2">Status</th>
            <th className="py-2 px-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-2">{customer.date}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                <Image
                  src={customer.image}
                  alt={customer.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                {customer.name}
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    customer.status === 'Success'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {customer.status}
                </span>
              </td>
              <td className="py-2 px-2">{customer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the modal when isModalOpen is true */}
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default NewCustomers;
