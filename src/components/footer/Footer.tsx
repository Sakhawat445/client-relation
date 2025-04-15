"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-4 bg-white py-8  border-gray-300">
      <div className="mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold text-indigo-600">swiftCRM</h1>
            <p className="mt-1 text-xs">
              Crafting Connections, One Customer at a Time.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-3 text-gray-700 text-sm">
            <Link href="/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link href="/customers" className="hover:text-indigo-600">
              Customers
            </Link>
            <Link href="/orders" className="hover:text-indigo-600">
              Order Overview
            </Link>
            <Link href="/analytics" className="hover:text-indigo-600">
              Analytics
            </Link>
            <Link href="/accounting" className="hover:text-indigo-600">
              Accounting
            </Link>
          </nav>
        </div>

        <div className="flex justify-center md:justify-end mt-6 gap-4 border-t-0 md:border-t pt-0 md:pt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow us on Facebook"
            className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow us on Instagram"
            className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow us on Twitter"
            className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-500 text-xs gap-2 text-center">
          <Link href="/privacy-policy" className="hover:text-indigo-600">
            Privacy Policy
          </Link>
          <p>&copy; {new Date().getFullYear()} Mugna Technologies, Inc.</p>
          <Link href="/terms" className="hover:text-indigo-600">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
