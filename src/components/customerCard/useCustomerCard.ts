import { useAppSelector } from "@/redux/store";

export const useCustomerCard = () => {
  const customers = useAppSelector((state) => state.customer.customers);
  return customers ? customers.length : 0;
};
