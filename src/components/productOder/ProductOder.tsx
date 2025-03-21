"use client";

import React from "react";
import Product from "./Product";
import { useProducts } from "../product/useProductList";
import { useCustomerList } from "../newCustomer/useCustomerList";

// Define the Customer type
interface Customer {
  id: string;
  productType: string;
  orderCount?: number;
}

const ProductOrder: React.FC = () => {
  const { products = [], status: productStatus, error: productError } = useProducts();
  const { customers = [] as Customer[], status: customerStatus } = useCustomerList();

  if (productStatus === "loading" || customerStatus === "loading") return <p>Loading products...</p>;
  if (productError) return <p className="text-red-500">Error: {productError}</p>;

  // Map products and find total order count from different users
  const updatedProducts = products.map((product) => {
    // Get users who ordered this product
    const matchingOrders = (customers as Customer[]).filter(
      (customer: Customer) => customer.productType === product.id
    );

    // Calculate total orders from all users who ordered this product
    const totalOrderCount = matchingOrders.reduce((sum, customer) => sum + (customer.orderCount || 0), 0);

    // Check stock availability
    const isAvailable = totalOrderCount <= product.stock; // If total orders are within stock, it's available

    return {
      ...product,
      orderCount: totalOrderCount, // Total orders from different users
      status: isAvailable ? "Available" : "Out of Stock",
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Best Selling Products
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-3 text-gray-600">Product Name</th>
            <th className="py-3 px-3 text-gray-600">Total Order</th>
            <th className="py-3 px-3 text-gray-600">Status</th>
            <th className="py-3 px-3 text-gray-600">Price</th>
          </tr>
        </thead>
        <tbody>
          {updatedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductOrder;
