import React from "react";
import Card from "@/components/card/Card";
import { FaUsers } from "react-icons/fa";
import { useCustomerCard } from "./useCustomerCard";

const NonMember = () => {
  const NonMember = useCustomerCard();

  return (
    <Card
      title="Non-Member"
      value={NonMember}
      color="bg-white"
      textColor="text-black"
      icon={<FaUsers className="text-black" />}
    />
  );
};

export default NonMember;
