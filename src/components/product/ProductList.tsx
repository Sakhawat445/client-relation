'use client'; // If using Next.js 13 App Router

import React from 'react';
import Image from 'next/image';
import { useProducts } from './useProductList'; // Adjust the path

const ProductList: React.FC = () => {
  const { products, status, error } = useProducts();

  // Handle loading/error states
  if (status === 'loading') {
    return <p>Loading products...</p>;
  }
  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white rounded-lg p-4 w-full shadow">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <ul className="list-none m-0 p-0 space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
          <Image 
    src={product.imageURL} 
    alt={product.name} 
    width={64} 
    height={64} 
    className="object-cover rounded-lg"
  />
            
            <div className="flex-1">
              <p className="m-0 text-base font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-gray-500">{product.companyName}</p>
            </div>
            <p className="text-base font-semibold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
