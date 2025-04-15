"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchProducts } from "../../redux/slice/productSlice";
import { fetchCustomers } from "../../redux/slice/customerSlice";

export function useProductOrderData() {
  const dispatch = useAppDispatch();

  const {
    products,
    status: productStatus,
    error: productError,
  } = useAppSelector((state) => state.product);
  const {
    customers,
    status: customerStatus,
    error: customerError,
  } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  return {
    products,
    productStatus,
    productError,
    customers,
    customerStatus,
    customerError,
  };
}
