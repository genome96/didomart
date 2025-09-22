import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  {settings?.siteName || 'DIDO'}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {settings?.siteDescription || 'Tools & Equipment'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="ml-10 space-x-8 hidden lg:block">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="ml-10 space-x-4 flex items-center">
            {/* User Authentication */}
            {user ? (
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6 text-gray-500" />
                  <span className="hidden sm:block">{user.name || user.email}</span>
                </div>
                <div className="relative">
                  {/* Admin link hidden - accessible only via direct URL */}
                  <button
                    onClick={logout}
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                {/* Admin link hidden - accessible only via direct URL */}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin link hidden - accessible only via direct URL */}
              {!user && (
                <div className="hidden">
                  {/* Admin link hidden for security */}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
