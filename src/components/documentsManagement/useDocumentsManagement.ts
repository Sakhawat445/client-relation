"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCustomers } from "../../redux/slice/customerSlice"; // Adjust path

export function useDocumentsManagement() {
  const dispatch = useAppDispatch();
  const { customers, status, error } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return { customers, status, error };
}
