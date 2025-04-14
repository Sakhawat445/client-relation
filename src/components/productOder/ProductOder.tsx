"use client";

import React from "react";
import ProductOrderList from "../productOrderList/Product";
import { useProductOrderData } from "./useProductOrderData";
import {  Customer } from "@/types/types"


const ProductOrder: React.FC = () => {
  const {
    products = [],
    productStatus,
    productError,
    customers = [],
    customerStatus,
  } = useProductOrderData();

  if (productStatus === "loading" || customerStatus === "loading")
    return <p>Loading products...</p>;

  if (productError)
    return <p className="text-red-500">Error: {productError}</p>;

  const updatedProducts = products?.map((product) => {
    const matchingOrders = customers?.filter(
      (customer: Customer) => customer.productType === product?.id
    );

    const totalOrderCount = matchingOrders.reduce(
      (sum, customer) => sum + (customer?.orderCount || 0),
      0
    );

    const isAvailable = totalOrderCount <= product.stock;

    return {
      ...product,
      orderCount: totalOrderCount,
      status: isAvailable ? "Available" : "Out of Stock",
    };
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto mt-5 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Best Selling Products
      </h2>
<hr />  
    <div className="min-w-[600px] mt-6">
      
        <table className="w-full text-left border-collapse">
        <thead>
    <tr className=" bg-purple-200">
      <th className="py-3 px-3">Product Name</th>
      <th className="py-3 px-3">Total Order</th>
      <th className="py-3 px-3">Status</th>
      <th className="py-3 px-3">Price</th>
    </tr>
  </thead>
          <tbody>
            {updatedProducts.map((product) => (
              <ProductOrderList key={product?.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductOrder;
