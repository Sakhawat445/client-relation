import React from "react";
import Card from "@/components/card/Card";
import { FaUsers } from "react-icons/fa";
import { useCustomerCard } from "./useCustomerCard";

const NewCustomer = () => {
  const NewCustomers = useCustomerCard();

  return (
    <Card
      title="New Customers"
      value={NewCustomers}
      color="bg-white"
      textColor="text-black"
      icon={<FaUsers className="text-black" />}
    />
  );
};

export default NewCustomer;
