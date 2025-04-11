'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
<footer className="w-[1350] -ml-87 mt-4 bg-white border-t border-gray-300 py-8 h-[225px] " >      <div className="container mx-auto px-4 w-screen">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold text-indigo-600">swiftCRM</h1>
            <p className="mt-1 text-xs">Crafting Connections, One Customer at a Time.</p>
          </div>

          <nav className="flex gap-4 text-gray-700 text-sm">
            <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link href="/customers" className="hover:text-indigo-600">Customers</Link>
            <Link href="/orders" className="hover:text-indigo-600">Order Overview</Link>
            <Link href="/analytics" className="hover:text-indigo-600">Analytics</Link>
            <Link href="/accounting" className="hover:text-indigo-600">Accounting</Link>
          </nav>
        </div>

        <div className="flex justify-end mt-4 gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600" title="Follow us on Facebook">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600" title="Follow us on Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600" title="Follow us on Twitter">
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-500 text-xs">
          <Link href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link>
          <p>&copy; {new Date().getFullYear()} Mugna Technologies, Inc.</p>
          <Link href="/terms" className="hover:text-indigo-600">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;