'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store'; 
import { fetchProducts } from '../../redux/slice/productSlice'; 

export function useProducts() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, status, error };
}
