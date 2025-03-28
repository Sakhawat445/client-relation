'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useHeader } from './useHeader';

const Header: React.FC = () => {
  // Use the custom hook to get user data and search state/handler.
  const { user, search, handleSearchChange } = useHeader();

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className=""></h1>
      <div className="flex items-center gap-3">
        {user?.imageURL && (
          <Image
            src={user.imageURL
         || '/default-avatar.png'}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border"
          />
        )}
        <span className="font-medium text-gray-700">
          Welcome back, {user?.name || 'User'}
        </span>
      </div>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </header>
  );
};

export default Header;
