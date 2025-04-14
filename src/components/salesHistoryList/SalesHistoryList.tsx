import React from "react";
import Image from "next/image";

interface SaleItemProps {
  name: string;
  country: string;
  amount: number;
  image: string;
}

const SalesHistoryList: React.FC<SaleItemProps> = ({ name, country, amount, image }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Image src={image} alt={name} width={40} height={40}             
        className="rounded-full aspect-square object-cover" />
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{country}</p>
        </div>
      </div>
      <p className="text-gray-800 font-semibold">${amount.toFixed(2)}</p>
    </div>
  );
};

export default SalesHistoryList;
