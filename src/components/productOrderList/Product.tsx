"use client";

import React from "react";
import Image from "next/image";
import { ProductProps } from "@/types/types";

const ProductOrderList: React.FC<ProductProps> = ({ product }) => {
  return (
    <tr>
      <td className="py-3 px-3 flex items-center gap-3">
        <Image
          src={product.imageURL || "/placeholder.png"}
          alt={product.name}
          width={40}
          height={40}
        />
        <div>
          <p className="font-medium text-gray-800">{product.name}</p>
          <p className="text-sm text-gray-500">{product.companyName}</p>
        </div>
      </td>

      <td className="py-3 px-3">
        <p className="text-gray-800 font-medium">{product.orderCount} pcs</p>
        <p className="text-sm text-gray-500">{product.orderDate}</p>
      </td>

      <td className="py-3 px-3">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            product.status === "Available"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status}
        </span>
      </td>

      <td className="py-3 px-3 font-semibold text-gray-800">
        ${product.price.toFixed(2)}
      </td>
    </tr>
  );
};

export default ProductOrderList;
