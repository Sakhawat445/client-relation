// components/document/useDocumentsManagement.ts

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCustomers } from "../../redux/slice/customerSlice"; // Adjust path if needed
import { Customer } from "@/types/types";

export function useDocumentsManagement() {
  const dispatch = useAppDispatch();
  const { customers, status, error } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Rename customers to documents in the returned object.
  return { documents: customers as Customer[], status, error };
}
