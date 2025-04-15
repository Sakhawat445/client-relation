import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchCustomers } from "@/redux/slice/customerSlice";

export const useCustomerCard = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customer?.customers);

  useEffect(() => {
    if (!customers || customers?.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [customers, dispatch]);

  return customers ? customers.length : 0;
};
