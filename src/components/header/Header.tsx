'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useHeader } from './useHeader';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Header: React.FC = () => {
  const { user, search, handleSearchChange } = useHeader();
  const pathname = usePathname();

  const isDashboard = pathname === '/dashboard';

  let pageName = '';
  if (!isDashboard) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      pageName = capitalize(segments[segments.length - 1]);
    }
  }

  if (isDashboard) {
    return (
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-md">
        <div className="flex items-center gap-4  p-4 rounded-md">
          {user?.imageURL ? (
            <Image
              src={user.imageURL}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full aspect-square object-cover"
            />
          ) : (
            <Image
              src="/default-avatar.png"
              alt="Default Avatar"
              width={60}
              height={60}
              className="rounded-full border"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome Back,{' '}
              <span className="text-purple-600">
                {user?.name || 'User'}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here are your monthly store updates.
            </p>
          </div>
        </div>

        <div className="relative hidden md:flex w-full md:w-80 mt-4 md:mt-0 rounded-md overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Type here"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button className="flex items-center justify-center gap-1 px-4 bg-purple-500 text-white text-sm font-medium">
            <Search size={16} />
            Search
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-10">
      <div>
        <h1 className="text-xl font-bold">{pageName || 'Page'}</h1>
      </div>

      <div className="flex items-center gap-3">
        {user?.imageURL ? (
          <Image
            src={user.imageURL}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full aspect-square object-cover"
          />
        ) : (
          <Image
            src="/default-avatar.png"
            alt="Default Avatar"
            width={60}
            height={60}
            className="rounded-full border"
          />
        )}
        <span className="font-medium text-gray-700 text-lg">
          Welcome back, {user?.name || 'User'}
        </span>
      </div>
    </header>
  );
};

export default Header;
