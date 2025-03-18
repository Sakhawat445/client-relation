'use client';

import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/slice/productSlice';
import type { AppDispatch } from '../redux/store';
interface ProductModalProps {
    onClose: () => void;
    onSave: (newProduct: {
      name: string;
      price: number;
      stock: number;
      companyName: string;
      imageFile?: File | null;
    }) => void;
  }

const ProductModal: React.FC<ProductModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch the createProduct thunk with the product data.
    // Note: The slice expects an "imageURL" string, so here we ignore the imageFile,
    // or later you can implement an upload flow and pass the URL.
    await dispatch(
      createProduct({
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        companyName,
        imageURL: '', // Modify this if you integrate an image upload solution.
      })
    );
    onClose();
  };

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
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
