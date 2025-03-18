import { useState } from 'react';
import { useAppSelector, type RootState } from '@/redux/store';

export function useHeader() {
  // Get the current user from the auth slice in Redux.
  const user = useAppSelector((state: RootState) => state.auth.user);
  
  // Manage local search state.
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { user, search, handleSearchChange };
}
