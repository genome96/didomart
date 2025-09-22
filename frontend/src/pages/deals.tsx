import React from 'react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Layout from '@/components/layout/Layout';
import { FireIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[]; // Changed from complex object to simple string array
  stockQuantity: number;
  inStock: boolean;
  category: {
    name: string;
    slug: string;
  };
}

interface DealsPageProps {
  hotProducts: Product[];
  error?: string;
}

export default function DealsPage({ hotProducts, error }: DealsPageProps) {

  const formatPrice = (price: number) => {
    return `KSh ${price.toFixed(2)}`;
  };

  const getPrimaryImage = (images: string[]) => {
    return images && images.length > 0 ? images[0] : '/images/placeholder.svg';
  };

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <FireIcon className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load deals</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FireIcon className="h-12 w-12 text-yellow-300" />
              </div>
              <h1 className="text-4xl font-extrabold mb-4">
                🔥 Hot Deals & Special Offers
              </h1>
              <p className="text-xl text-red-100 max-w-2xl mx-auto">
                Limited time offers on our best products. Don't miss out on these incredible savings!
              </p>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {hotProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Hot Deals Available</h3>
              <p className="text-gray-600">Check back soon for amazing deals and offers!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotProducts.map((product) => {
                const discountPercent = getDiscountPercentage(product.originalPrice || 0, product.price);
                
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Product Image */}
                    <div className="relative">
                      <div className="w-full h-48 relative bg-gray-100">
                        <Image
                          src={getPrimaryImage(product.images)}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Discount Badge */}
                      {discountPercent > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                          -{discountPercent}%
                        </div>
                      )}
                      
                      {/* Hot Deal Badge */}
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <FireIcon className="h-3 w-3 mr-1" />
                        HOT
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>

                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mb-4">
                        {product.inStock ? (
                          <span className="text-green-600 text-sm">
                            ✅ In Stock ({product.stockQuantity} available)
                          </span>
                        ) : (
                          <span className="text-red-600 text-sm">
                            ❌ Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        disabled={!product.inStock}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                          product.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<DealsPageProps> = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${apiUrl}/products/hot-deals`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      return {
        props: {
          hotProducts: data.data,
        },
      };
    } else {
      throw new Error(data.message || 'Failed to fetch hot deals');
    }
  } catch (error) {
    console.error('Error fetching hot deals:', error);
    return {
      props: {
        hotProducts: [],
        error: error instanceof Error ? error.message : 'Failed to load deals',
      },
    };
  }
};
