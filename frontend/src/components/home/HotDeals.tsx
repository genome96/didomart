import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClockIcon, FireIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import { getProductImage } from '@/utils/imageUtils';

interface HotDealsProps {
  products?: Product[];
}

const HotDeals: React.FC<HotDealsProps> = ({ products = [] }) => {
  // Helper function to get product ID
  const getProductId = (product: Product): string => {
    return product._id || (product as any).id?.toString() || '';
  };

  const getDiscountPercentage = (originalPrice?: number, currentPrice?: number): number => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };



  // Use actual products if available
  const displayProducts = products.length > 0 ? products : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  const getProgressPercentage = (sold: number, total: number) => {
    return Math.min((sold / total) * 100, 100);
  };

  const TimeDisplay: React.FC<{ time: any }> = ({ time }) => {
    if (!time) return <span className="text-red-500 font-semibold">Deal Expired</span>;

    return (
      <div className="flex space-x-2 text-center">
        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem]">
          {time.days}d
        </div>
        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem]">
          {time.hours}h
        </div>
        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem]">
          {time.minutes}m
        </div>
        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[2rem]">
          {time.seconds}s
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <FireIcon className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hot Deals
            </h2>
            <FireIcon className="h-8 w-8 text-red-500 ml-3" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Limited time offers on our best-selling products. Don't miss out!
          </motion.p>
        </div>

        {/* Deals grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayProducts.length > 0 ? (
            displayProducts.slice(0, 6).map((product, index) => {
              const discountPercent = getDiscountPercentage(product.originalPrice, product.price);
              
              return (
                <motion.div
                  key={getProductId(product)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-200 hover:border-red-300 transition-all duration-300"
                >
                  {/* Deal badge */}
                  <div className="relative">
                    {discountPercent > 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm animate-pulse">
                          {discountPercent}% OFF
                        </span>
                      </div>
                    )}
                    
                    {/* Hot Deal badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <FireIcon className="h-3 w-3 mr-1" />
                        HOT
                      </span>
                    </div>
                    
                    {/* Product image */}
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <Image
                        src={getProductImage(product)}
                        alt={product.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                      {product.category.name}
                    </span>
                    
                    {/* Product name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex space-x-2">
                      <Link 
                        href={`/products/${getProductId(product)}`}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-center"
                      >
                        View Deal
                      </Link>
                      <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <ShoppingCartIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12">
              <FireIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hot Deals Available</h3>
              <p className="text-gray-600">Check back soon for amazing deals!</p>
            </div>
          )}


        {/* View all deals button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/deals"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg"
          >
            <FireIcon className="h-5 w-5 mr-2" />
            View All Hot Deals
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default HotDeals;
