import React from "react";
import Card from "@/components/card/Card";
import { FaUsers } from "react-icons/fa";
import { useCustomerCard } from "./useCustomerCard";

const Member = () => {
  const customerCardData = useCustomerCard();
  const MemberCustomers =
    typeof customerCardData === "number" ? customerCardData : 0;

  return (
    <Card
      color="bg-white"
      title="Member"
      value={MemberCustomers}
      textColor="text-black"
      icon={<FaUsers className="text-green-500" />}
    />
  );
};

export default Member;
