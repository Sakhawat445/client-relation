'use client'; // Required if using Next.js 13 App Router with React hooks

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Adjust the path as needed
import { fetchProducts } from '../../redux/slice/productSlice'; // Adjust the path as needed

export function useProducts() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, status, error };
}
