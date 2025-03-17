'use client';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slice/authSlice';
import { Home, Bell, Users, List, BarChart2, FileText, HelpCircle, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

  const Sidebar = () => {
    const [active, setActive] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Home />, path: '/' },
    { name: 'Notifications', icon: <Bell />, path: '/notifications' },
    { name: 'Customers', icon: <Users />, path: '/customers' },
    { name: 'Order Overview', icon: <List />, path: '/orders' },
    { name: 'Analytics', icon: <BarChart2 />, path: '/analytics' },
    { name: 'Documents', icon: <FileText />, path: '/documents' },
  ];

  const supportItems = [
    { name: 'Help', icon: <HelpCircle />, path: '/help' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md p-5 flex flex-col">
      <h1 className="text-xl font-bold text-indigo-600">swiftCRM</h1>
      <nav className="mt-5 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all ${
    active === item.name ? 'bg-indigo-500 text-white' : 'text-gray-700'
  }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-2 border-t pt-4">
        {supportItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200">
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left rounded-lg cursor-pointer text-red-600 hover:bg-red-100"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
