'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useHeader } from './useHeader';

// Utility function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Header: React.FC = () => {
  const { user, search, handleSearchChange } = useHeader();
  const pathname = usePathname();

  // Check if we are on the dashboard page
  const isDashboard = pathname === '/dashboard';

  // For non-dashboard pages, compute the page name
  let pageName = '';
  if (!isDashboard) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      pageName = capitalize(segments[segments.length - 1]);
    }
  }

  // If on dashboard, render the default header as in the old code
  if (isDashboard) {
    return (
      <header className="flex items-center justify-between p-4">
        <div className="flex  gap-3">
          {user?.imageURL && (
            <Image
              src={user.imageURL || '/default-avatar.png'}
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
  }

  // For other pages, render the header with the page name and updated user profile info.
  return (
    <header className="flex items-center justify-between p-10 ">
      {/* Left side - display page name */}
      <div>
        <h1 className="text-xl font-bold">{pageName || 'Page'}</h1>
      </div>

      {/* Right side - display user profile info with larger image */}
      <div className="flex items-center gap-3">
        {user?.imageURL ? (
          <Image
            src={user.imageURL}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border"
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
