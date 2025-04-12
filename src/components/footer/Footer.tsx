'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-4 bg-white border-t border-gray-300 py-8">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold text-indigo-600">swiftCRM</h1>
            <p className="mt-1 text-xs">Crafting Connections, One Customer at a Time.</p>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-3 text-gray-700 text-sm">
            <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link href="/customers" className="hover:text-indigo-600">Customers</Link>
            <Link href="/orders" className="hover:text-indigo-600">Order Overview</Link>
            <Link href="/analytics" className="hover:text-indigo-600">Analytics</Link>
            <Link href="/accounting" className="hover:text-indigo-600">Accounting</Link>
          </nav>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center md:justify-end mt-6 gap-4">
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

        {/* Bottom info row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-500 text-xs gap-2 text-center">
          <Link href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link>
          <p>&copy; {new Date().getFullYear()} Mugna Technologies, Inc.</p>
          <Link href="/terms" className="hover:text-indigo-600">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
