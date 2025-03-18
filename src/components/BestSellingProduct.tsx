'use client';

import React, { useState } from 'react';
import Button from './Button';
import ProductModal from './ProductModal';
import ProductList from './ProductList';

const BestSellingProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // This function is called when the modal's Save button is clicked.
  // You can integrate your own create logic here (e.g., dispatching a Redux thunk).
  const handleSaveProduct = (newProduct: {
    name: string;
    price: number;
    stock: number;
    companyName: string;
    imageFile?: File | null;
  }) => {
    console.log('New product saved:', newProduct);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 w-full shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Best Selling Products</h2>
          <Button onClick={handleOpenModal}>Add Product</Button>
        </div>

        {/* Use the ProductList component to display products */}
        <ProductList />

        {/* Render ProductModal when isModalOpen is true */}
        {isModalOpen && (
          <ProductModal onClose={handleCloseModal} onSave={handleSaveProduct} />
        )}
      </div>
    </>
  );
};

export default BestSellingProducts;
