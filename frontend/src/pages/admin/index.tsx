import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  usersChange: number;
}

interface RecentOrder {
  id: number;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  sales: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ 
    email: 'admin@yourbusiness.com', 
    password: 'AdminPassword123!' 
  });
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    revenueChange: 0,
    ordersChange: 0,
    productsChange: 0,
    usersChange: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminAuth === 'true' && adminToken) {
      // Validate token by making a test API call
      validateTokenAndLogin();
    } else {
      setLoading(false);
    }
  }, []);

  const validateTokenAndLogin = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'admin') {
          setIsAuthenticated(true);
          fetchDashboardData();
        } else {
          // User is not admin, clear tokens
          handleLogout();
        }
      } else {
        // Invalid token, clear storage
        handleLogout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      handleLogout();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Check if user has admin role
        if (data.user && data.user.role === 'admin') {
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('adminToken', data.token);
          setIsAuthenticated(true);
          fetchDashboardData();
        } else {
          setLoginError('Access denied. Admin privileges required.');
        }
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock dashboard stats
      setStats({
        totalRevenue: 125420.50,
        totalOrders: 1247,
        totalProducts: 156,
        totalUsers: 89,
        revenueChange: 12.5,
        ordersChange: 8.2,
        productsChange: -2.1,
        usersChange: 15.7
      });

      // Mock recent orders
      setRecentOrders([
        { id: 1001, customerName: 'John Smith', total: 299.99, status: 'pending', date: '2024-01-15' },
        { id: 1002, customerName: 'Sarah Johnson', total: 149.50, status: 'processing', date: '2024-01-15' },
        { id: 1003, customerName: 'Mike Wilson', total: 89.99, status: 'shipped', date: '2024-01-14' },
        { id: 1004, customerName: 'Emma Davis', total: 199.99, status: 'delivered', date: '2024-01-14' },
        { id: 1005, customerName: 'Tom Brown', total: 349.99, status: 'processing', date: '2024-01-13' }
      ]);

      // Mock low stock products
      setLowStockProducts([
        { id: 1, name: 'Power Drill XL', stock: 3, price: 199.99, sales: 45 },
        { id: 2, name: 'Hammer Set', stock: 5, price: 49.99, sales: 32 },
        { id: 3, name: 'Screwdriver Kit', stock: 2, price: 29.99, sales: 28 }
      ]);

      // Mock top products
      setTopProducts([
        { id: 1, name: 'Power Drill XL', stock: 25, price: 199.99, sales: 145 },
        { id: 2, name: 'Circular Saw', stock: 18, price: 299.99, sales: 98 },
        { id: 3, name: 'Tool Set Professional', stock: 12, price: 149.99, sales: 87 },
        { id: 4, name: 'Impact Driver', stock: 22, price: 179.99, sales: 76 }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {change >= 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-600 ml-1">vs last month</span>
      </div>
    </div>
  );

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <>
        <NextSeo
          title="Admin Login"
          description="Admin login page"
        />
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please sign in to access the admin dashboard
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center">
                  {loginError}
                  {loginError.includes('User not found') && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        Clear saved session and try again
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Demo credentials: admin / admin123
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <NextSeo
        title="Admin Dashboard"
        description="Admin dashboard for managing products, orders, and business analytics"
      />

      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={stats.totalRevenue}
              change={stats.revenueChange}
              icon={CurrencyDollarIcon}
              prefix="KSh "
            />
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              change={stats.ordersChange}
              icon={ShoppingCartIcon}
            />
            <StatCard
              title="Products"
              value={stats.totalProducts}
              change={stats.productsChange}
              icon={ShoppingBagIcon}
            />
            <StatCard
              title="Users"
              value={stats.totalUsers}
              change={stats.usersChange}
              icon={UsersIcon}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">KSh {order.total}</p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => router.push('/admin/orders')}
                    className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Orders →
                  </button>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">KSh {product.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{product.sales} sold</p>
                        <p className="text-sm text-gray-600">{product.stock} in stock</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => router.push('/admin/products')}
                    className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Manage Products →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockProducts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-2" />
                <h2 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">KSh {product.price}</p>
                    <p className="text-sm font-medium text-red-600">Only {product.stock} left</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => router.push('/admin/products')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                >
                  Manage Inventory
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => router.push('/admin/products/new')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <ShoppingBagIcon className="h-8 w-8 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">Create new product listing</p>
              </button>
              <button 
                onClick={() => router.push('/admin/orders')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <ShoppingCartIcon className="h-8 w-8 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">View Orders</p>
                <p className="text-sm text-gray-600">Manage customer orders</p>
              </button>
              <button 
                onClick={() => router.push('/admin/users')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <UsersIcon className="h-8 w-8 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-600">View customer accounts</p>
              </button>
              <button 
                onClick={() => router.push('/admin/analytics')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <ChartBarIcon className="h-8 w-8 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">View detailed reports</p>
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
