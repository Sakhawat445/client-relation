'use client';
import React from 'react';
import Link from 'next/link';
import {
  Home, Users, List, BarChart2, FileText,
  HelpCircle, Settings, LogOut, Menu, X
} from 'lucide-react';
import { useSidebar } from './useSideBar';

const Sidebar: React.FC = () => {
  const { active, setActive, handleLogout, isOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { name: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { name: 'Customers', icon: <Users />, path: '/customers' },
    { name: 'Order Overview', icon: <List />, path: '/orders' },
    { name: 'Analytics', icon: <BarChart2 />, path: '/analytics' },
    { name: 'Documents', icon: <FileText />, path: '/documents' },
    { name: 'Profile', icon: <FileText />, path: '/profile' },
  ];

  const supportItems = [
    { name: 'Help', icon: <HelpCircle />, path: '/help' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-5 right-5 z-50 bg-purple-500 p-5 rounded ml-7"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      <div
        className={`fixed rounded w-64 mt-10 ml-4 bg-white h-144 shadow-md p-5 flex flex-col z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
      >
        <h1 className="text-xl font-bold text-indigo-600">swiftCRM</h1>

        <nav className="mt-5 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all ${
                  active === item.name ? 'bg-indigo-500 text-white' : 'text-gray-700'
                }`}
                onClick={() => {
                  setActive(item.name);
                  toggleSidebar();  
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="border-t">
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
    </>
  );
};

export default Sidebar;
