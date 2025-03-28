'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../input/InputField';
import Button from '../button/Button';
import type { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/store';
import { createCustomer } from '@/redux/slice/customerSlice';

const initialState = {
  name: '',
  email: '',
  imageURI: '',
  orderCount: 0,
  spendings: 0,
  documentURL: '',
  // createdDate: new Date().toISOString().split('T')[0],
  status: 'PENDING',
  address: { city: '', country: '' },
  contactNumber: '',
  deviceType: 'MOBILE',
  productType: '',
};

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialState);
  const [, setImageFile] = useState<File | null>(null);
  const [, setDocumentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();

  const products = useSelector((state: RootState) => state.product.products);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [city, country] = e.target.value.split(',').map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      address: { city: city || '', country: country || '' },
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (name === 'image') {
        setImageFile(file);
      } else if (name === 'document') {
        setDocumentFile(file);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      try {
        const response = await fetch('/api/imageUpload', {  // Fixed API endpoint
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        console.log('Upload successful:', result);

        if (name === 'image') {
          setFormData((prev) => ({ ...prev, imageURI: result.url }));
        } else if (name === 'document') {
          setFormData((prev) => ({ ...prev, documentURL: result.url }));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  // const uploadFile = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   try {
  //     const res = await fetch('/api/upload', {  // Fixed API endpoint
  //       method: 'POST',
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     return res.ok ? data.url : '';
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     return '';
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const customerData = {
      ...formData,
      address: `${formData.address.city}, ${formData.address.country}`,
      contactNumber: parseInt(formData.contactNumber, 10) || 0,
      createdDate: new Date().toISOString(), // Add the createdDate property
    };

    await dispatch(createCustomer(customerData));
    console.log(customerData);
    setFormData(initialState);
    setImageFile(null);
    setDocumentFile(null);
    setUploading(false);
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
          <Input type="text" name="name" value={formData.name} onChange={handleChange} label="Name" />
          <Input type="email" name="email" value={formData.email} onChange={handleChange} label="Email" />
          <label>Profile Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="block w-full" title="Upload profile image" />
          <label htmlFor="documentFile">Document</label>
          <input id="documentFile" type="file" name="document" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="block w-full" />
          {uploading && <p className="text-sm text-gray-500">Uploading files...</p>}
          <Input type="number" name="orderCount" value={formData.orderCount.toString()} onChange={handleChange} label="Order Count" />
          <Input type="number" name="spendings" value={formData.spendings.toString()} onChange={handleChange} label="Spendings" />
          <Input type="text" name="documentURL" value={formData.documentURL} onChange={handleChange} label="Document URL" />
          {/* <Input name="createdDate" type="date" value={formData.createdDate} onChange={handleChange} label="Created Date" /> */}
          <label>Status</label>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </select>
          <Input type="text" name="address" value={`${formData.address.city}, ${formData.address.country}`} onChange={handleAddressChange} label="Address" />
          <Input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} label="Contact Number" />
          <label>Device Type</label>
          <label htmlFor="deviceType">Device Type</label>
          <select id="deviceType" name="deviceType" value={formData.deviceType} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="MOBILE">Mobile</option>
            <option value="DESKTOP">Desktop</option>
          </select>
          <label>Product</label>
          <label htmlFor="productType">Product</label>
          <select id="productType" name="productType" value={formData.productType} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="" disabled>Select product</option>
            {products.length > 0 ? products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            )) : <option value="" disabled>No products available</option>}
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={uploading}>{uploading ? 'Saving...' : 'Add Customer'}</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerModal;
