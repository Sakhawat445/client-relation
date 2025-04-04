'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Input from '../input/InputField';
import Button from '../button/Button';
import type { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/store';
import { createCustomer, updateCustomer } from '@/redux/slice/customerSlice';
import { Customer } from '@/types/types';

const initialState = {
  name: '',
  email: '',
  imageURI: '',
  orderCount: 0,
  spendings: 0,
  documentURL: '',
  status: 'PENDING',
  address: { city: '', country: '' },
  contactNumber: '',
  deviceType: 'MOBILE',
  productType: '',
};
interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDocumentModal?: boolean;
  isEditModal?: boolean;
  isEditMode?: boolean;
  doc: Customer;
  editCustomer?: Customer | null; // Ensure this prop is defined for edit functionality
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  isDocumentModal,
  isEditMode,
  isEditModal,
  doc,
  
  editCustomer,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();

  const products = useSelector((state: RootState) => state.product.products);

  // When in edit mode, prefill form data with the passed customer doc.
  useEffect(() => {
    if (isEditModal || isEditMode) {
      const customerData = editCustomer || doc;
      // Parse address if stored as string
      const address = typeof customerData.address === 'string' ? 
        { city: customerData.address.split(',')[0]?.trim() || '', country: customerData.address.split(',')[1]?.trim() || '' } : 
        customerData.address;

      setFormData({
        name: customerData.name || '',
        email: customerData.email || '',
        imageURI: customerData.imageURI || '',
        orderCount: customerData.orderCount || 0,
        spendings: customerData.spendings || 0,
        documentURL: customerData.documentURL || '',
        status: customerData.status || 'PENDING',
        address: address || { city: '', country: '' },
        contactNumber: String(customerData.contactNumber || ''),
        deviceType: customerData.deviceType || 'MOBILE',
        productType: customerData.productType || customerData.product?.id || '',
      });
    }
  }, [isEditModal, isEditMode, doc, editCustomer]); // Add editCustomer to dependencies


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

      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('filename', file.name);

      try {
        const response = await fetch('/api/imageUpload', {
          method: 'POST',
          body: fileData,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
  
    if (isDocumentModal) {
      // Existing document update logic
      const updatedCustomer = {
        ...doc,
        documentURL: formData.documentURL,
      };
      await dispatch(updateCustomer(updatedCustomer));
    } else if (isEditMode || isEditModal) { // Combined edit mode check
      // Use same update pattern as document modal
      const updatedCustomer = {
        ...doc, // Use doc as base
        ...formData, // Spread form data
        address: `${formData.address.city}, ${formData.address.country}`,
        contactNumber: parseInt(formData.contactNumber, 10) || 0,
      };
      await dispatch(updateCustomer(updatedCustomer));
    } else {
      // Existing create logic
      const customerData = {
        ...formData,
        address: `${formData.address.city}, ${formData.address.country}`,
        contactNumber: parseInt(formData.contactNumber, 10) || 0,
        createdDate: new Date().toISOString(),
      };
      await dispatch(createCustomer(customerData));
    }
  
    setFormData(initialState);
    setUploading(false);
    onClose();
  };
  // If isDocumentModal prop is true, render a simplified form with one document input field.
  if (isDocumentModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/25">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
          <div>
            <label htmlFor="documentFile" className="block mb-1">
              Document
            </label>
            <input
              id="documentFile"
              type="file"
              name="document"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full"
              title="Upload a document file"
              placeholder="Choose a document file"
            />
          </div>
          {uploading && (
            <p className="text-sm text-gray-500">Uploading file...</p>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
  if (!isOpen) return null;

  // If isEditModal prop is true, render the edit customer modal with select fields.
  
  // Otherwise render the full customer modal (for adding a new customer).
  return (
    isEditMode ? (
<div className="fixed inset-0 flex items-center justify-center bg-black/25">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Edit Customer</h2>
          <div className="space-y-3">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
            />

            {/* Custom Image Upload Square for Profile Image */}
            <div>
              <input
                id={`imageUploadInput-${isEditModal ? 'edit' : 'add'}`}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                title="Upload a profile image"
                placeholder="Choose an image file"
              />
            </div>

            <Input
              type="number"
              name="orderCount"
              value={formData.orderCount.toString()}
              onChange={handleChange}
              label="Order Count"
            />

          
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    ): (

      <div className="fixed inset-0 flex items-center justify-center bg-black/25">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Customer</h2>
        <div className="space-y-3">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
          />

          {/* Custom Image Upload Square */}
          <div>
            <label className="block mb-1">Profile Image</label>
            <div
              onClick={() =>
                document.getElementById('imageUploadInput')?.click()
              }
              className="w-40 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
            >
              {formData.imageURI ? (
                <Image 
                  width={23}
                  height={23}
                  src={formData.imageURI}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </div>
            <input
              id="imageUploadInput"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              title="Upload a profile image"
              placeholder="Choose an image file"
            />
          </div>

          <div>
            <label htmlFor="documentFile" className="block mb-1">
              Document
            </label>
            <input
              id="documentFile"
              type="file"
              name="document"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full"
              title="Upload a document file"
              placeholder="Choose a document file"
              />
          </div>

          {uploading && (
            <p className="text-sm text-gray-500">Uploading files...</p>
          )}

          <Input
            type="number"
            name="orderCount"
            value={formData.orderCount.toString()}
            onChange={handleChange}
            label="Order Count"
          />
          <Input
            type="number"
            name="spendings"
            value={formData.spendings.toString()}
            onChange={handleChange}
            label="Spendings"
          />

          <label className="block">Status</label>
          <label htmlFor="status" className="block">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </select>

          <Input
            type="text"
            name="address"
            value={`${formData.address.city}, ${formData.address.country}`}
            onChange={handleAddressChange}
            label="Address"
          />
          <Input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            label="Contact Number"
          />

          <label htmlFor="deviceType" className="block">
            Device Type
          </label>
          <select
            id="deviceType"
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="MOBILE">Mobile</option>
            <option value="DESKTOP">Desktop</option>
          </select>

          <label htmlFor="productType" className="block">
            Product
          </label>
          <select
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled>
              Select product
            </option>
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No products available
              </option>
            )}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? 'Saving...' : 'Add Customer'}
          </Button>
        </div>
      </form>
    </div>
)
);
};

export default CustomerModal;
