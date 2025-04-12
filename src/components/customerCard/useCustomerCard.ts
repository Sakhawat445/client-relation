// import { useAppSelector } from "@/redux/store";

// export const useCustomerCard = () => {
//   const customers = useAppSelector((state) => state.customer.customers);
//   console.log('customers:>>', customers)
//   return customers ? customers.length : 0;
// };

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchCustomers } from "@/redux/slice/customerSlice";

export const useCustomerCard = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customer.customers);

  useEffect(() => {
    if (!customers || customers.length === 0) {
      dispatch(fetchCustomers()); // dispatch fetch if empty
    }
  }, [customers, dispatch]);

  console.log("customers:>>", customers);
  return customers ? customers.length : 0;
};
