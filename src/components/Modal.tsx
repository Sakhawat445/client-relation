'use client';

import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Input from './InputField'; // Ensure this component exists
import Button from './Button';
import type { RootState, AppDispatch } from '@/redux/store';
import { useAppDispatch } from '@/redux/store';
import { createCustomer } from '@/redux/slice/customerSlice';

const initialState = {
  name: '',
  email: '',
  imageURI: '',
  orderCount: '',
  spendings: '',
  documentURL: '',
  createdDate: '',
  status: '',
  address: '',
  contactNumber: '',
  deviceType: '',
  selectedProduct: '',
};

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // Fetch products from the product slice in Redux
  const products = useSelector((state: RootState) => state.product.products);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Triggered when an image is selected
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageURI: imageUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dispatch createCustomer thunk with the form data.
    // Convert numeric fields as necessary.
    await dispatch(
      createCustomer({
        name: formData.name,
        email: formData.email,
        imageURI: formData.imageURI,
        orderCount: formData.orderCount ? parseInt(formData.orderCount) : 0,
        spendings: formData.spendings ? parseInt(formData.spendings) : 0,
        documentURL: formData.documentURL,
        createdDate: formData.createdDate, // Adjust conversion if needed
        status: formData.status,
        address: formData.address,
        contactNumber: formData.contactNumber
          ? parseInt(formData.contactNumber)
          : 0,
        deviceType: formData.deviceType,
        selectedProduct: formData.selectedProduct,
      })
    );

    setFormData(initialState);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Customer</h2>
        <div className="space-y-3">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer Name"
            type="text"
            label="Name"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            label="Email"
          />
          {/* Hidden file input for image selection */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Image
            </label>
            <div
              className="w-32 h-32 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.imageURI ? (
                <img
                  src={formData.imageURI}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Click to select image</span>
              )}
            </div>
          </div>
          <Input
            name="orderCount"
            value={formData.orderCount}
            onChange={handleChange}
            placeholder="Order Count"
            type="number"
            label="Order Count"
          />
          <Input
            name="spendings"
            value={formData.spendings}
            onChange={handleChange}
            placeholder="Spendings"
            type="number"
            label="Spendings"
          />
          <Input
            name="documentURL"
            value={formData.documentURL}
            onChange={handleChange}
            placeholder="Document URL"
            type="text"
            label="Document URL"
          />
          <Input
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
            placeholder="Created Date"
            type="date"
            label="Created Date"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            type="text"
            label="Address"
          />
          <Input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            type="tel"
            label="Contact Number"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Type
            </label>
            <select
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select device type</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              name="selectedProduct"
              value={formData.selectedProduct}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerModal;
