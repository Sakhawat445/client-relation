'use client';

import React from 'react';
import InputField from '../input/InputField';
import Button from '../button/Button';
import useProductModal from './useProductModal';
import { ProductModalProps } from '@/types/types';



const ProductModal: React.FC<ProductModalProps> = ({ onClose }) => {
  const {
    name,
    price,
    stock,
    companyName,
    uploading,
    setName,
    setPrice,
    setStock,
    setCompanyName,
    handleFileChange,
    handleSubmit,
  } = useProductModal(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="productName"
            label="Product Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
          <InputField
            name="price"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
          <InputField
            name="stock"
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock quantity"
          />
          <InputField
            name="companyName"
            label="Company Name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full"
              placeholder="Upload product image"
              title="Product Image Upload"
            />
          </div>
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
