'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slice/authSlice';
import type { AppDispatch } from '@/redux/store';

export const useSidebar = () => {
  const [active, setActive] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  return { active, setActive, handleLogout };
};
