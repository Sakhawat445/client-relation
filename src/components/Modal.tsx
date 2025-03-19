"use client";

import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Input from "./InputField";
import Button from "./Button";
import type { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { createCustomer } from "@/redux/slice/customerSlice";

const initialState = {
  name: "",
  email: "",
  imageURI: "",
  orderCount: 0,
  spendings: 0,
  documentURL: "",
  createdDate: new Date().toISOString().split("T")[0], // Default to today's date
  status: "PENDING",
  address: { city: "", country: "" },
  contactNumber: 0,
  deviceType: "MOBILE",
  productType: "",
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
  console.log(products);
  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const [city, country] = value.split(",").map((item) => item.trim()); // Split city and country
    setFormData((prev) => ({
      ...prev,
      address: { city: city || "", country: country || "" }, // Ensure empty values are handled
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageURI: imageUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the customer data to match the Prisma schema
    const customerData = {
      name: formData.name,
      email: formData.email,
      imageURI: formData.imageURI,
      orderCount: formData.orderCount,
      spendings: formData.spendings,
      documentURL: formData.documentURL,
      createdDate: new Date(formData.createdDate).toISOString(),
      status: formData.status,
      address: `${formData.address.city}, ${formData.address.country}`, // Convert address object to string
      contactNumber: formData.contactNumber,
      deviceType: formData.deviceType,
      productType: formData.productType,
    };

    // Dispatch createCustomer thunk with the form data
    await dispatch(createCustomer(customerData));

    // Reset form and close modal
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
            value={formData.orderCount.toString()}
            onChange={handleChange}
            placeholder="Order Count"
            type="number"
            label="Order Count"
          />
          <Input
            name="spendings"
            value={formData.spendings.toString()}
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
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>
          <Input
            name="address"
            value={`${formData.address.city}${
              formData.address.country ? `, ${formData.address.country}` : ""
            }`}
            onChange={handleAddressChange}
            placeholder="City,Country"
            type="text"
            label="Address"
          />
          <Input
            name="contactNumber"
            value={formData.contactNumber.toString()}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactNumber: parseInt(e.target.value, 10) || 0,
              }))
            }
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
              <option value="MOBILE">Mobile</option>
              <option value="DESKTOP">Desktop</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              name="productType" // Ensure this matches formData key
              value={formData.productType || ""} // Ensure it's always a string
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
