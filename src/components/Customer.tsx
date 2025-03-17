'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button'; 

const customers = [
  { date: '31 Jul 2023', name: 'Jacob Swanson', status: 'Success', amount: '$989.00', image: '/avatar1.png' },
  { date: '31 Jul 2023', name: 'Amelia Johnson', status: 'Success', amount: '$1999.00', image: '/avatar2.png' },
  { date: '31 Jul 2023', name: 'Eric Slater', status: 'Pending', amount: '$2000.00', image: '/avatar3.png' },
  { date: '31 Jul 2023', name: 'Aaron Chadwick', status: 'Success', amount: '$289.00', image: '/avatar4.png' },
  { date: '31 Jul 2023', name: 'Jessica Sloan', status: 'Pending', amount: '$729.00', image: '/avatar5.png' },
  { date: '31 Jul 2023', name: 'Mary Brower', status: 'Success', amount: '$900.00', image: '/avatar6.png' },
];

const NewCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Customers</h2>
        <div className="flex gap-2 items-center">
        <Button onClick={() => alert('Add Customer Clicked')}>Add Customer</Button>
        <button
            className="p-1 text-gray-500 hover:text-indigo-600"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft />
          </button>
          <span className="text-sm">{currentPage} / {totalPages}</span>
          <button
            className="p-1 text-gray-500 hover:text-indigo-600"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
                    customer.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
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
    </div>
  );
};

export default NewCustomers;
