import React from "react";
import Card from "@/components/card/Card";
import { FaUsers } from "react-icons/fa";
import { useCustomerCard } from "./useCustomerCard";

const TotalCustomers = () => {
  const totalCustomers = useCustomerCard();

  return (
    <Card
      title="Total Customers"
      value={totalCustomers}
      color="bg-purple-500"
      icon={<FaUsers className="text-purple-500" />}
    />
  );
};

export default TotalCustomers;
