'use client';

import React, { useState } from 'react';
import Button from '../button/Button';
import ProductList from '../productList/ProductList';
import ProductModal from '../productModal/ProductModal';

const BestSellingProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
      <div className="bg-white rounded-lg p-4 w-full max-w-md sm:w-[320px] md:w-[360px] shadow mx-auto sm:ml-0">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg sm:text-xl font-semibold">Best Selling Products</h2>
          <Button onClick={handleOpenModal}>Add Product</Button>
        </div>

        {/* Product list display with scroll */}
        <div className="max-h-120 overflow-y-auto pr-2">
          <ProductList />
        </div>

        {/* Modal display */}
        {isModalOpen && (
          <ProductModal onClose={handleCloseModal} onSave={handleSaveProduct} />
        )}
      </div>
    </>
  );
};

export default BestSellingProducts;
