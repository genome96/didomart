import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: false },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, current: false },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon, current: false },
  { name: 'Users', href: '/admin/users', icon: UsersIcon, current: false },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update current navigation item based on current path
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: router.pathname === item.href || router.pathname.startsWith(item.href + '/')
  }));

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 ${sidebarOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {updatedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {updatedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">A</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700">Admin User</div>
                  <div className="text-xs text-gray-500">admin@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
