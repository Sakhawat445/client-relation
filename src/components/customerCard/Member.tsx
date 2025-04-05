import React from "react";
import Card from "@/components/card/Card";
import { FaUsers } from "react-icons/fa";
import { useCustomerCard } from "./useCustomerCard";

const Member = () => {
  const MemberCustomers = useCustomerCard();

  return (
    <Card
      title="Member"
      value={MemberCustomers}
      color="bg-green"
      textColor="text-black"
      icon={<FaUsers className="text-green-500" />}
    />
  );
};

export default Member;
