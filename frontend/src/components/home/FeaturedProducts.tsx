import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';

// Helper function to get product properties (handles both MongoDB and Sequelize formats)
const getProductId = (product: any): string => product._id || product.id?.toString() || '';
const getProductImages = (product: any): string[] => {
  if (Array.isArray(product.images)) {
    return product.images.map((img: any) => typeof img === 'string' ? img : img.url || img);
  }
  return [];
};
const getProductTitle = (product: any): string => product.title || product.name || '';
const getCategoryName = (product: any): string => product.category?.name || '';
const getCategorySlug = (product: any): string => product.category?.slug || '';

interface FeaturedProductsProps {
  products?: any[]; // Use any[] to handle both MongoDB and Sequelize formats
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products = [] }) => {
  const defaultProducts = [
    {
      _id: '1',
      id: 1,
      title: 'Professional Drill Set',
      description: 'High-performance cordless drill with 20V battery and comprehensive bit set',
      price: 199.99,
      originalPrice: 249.99,
      images: ['/images/placeholder.svg'],
      inStock: true,
      category: { name: 'Power Tools', slug: 'power-tools' }
    },
    {
      _id: '2',
      id: 2,
      title: 'Safety Helmet Pro',
      description: 'Premium safety helmet with adjustable suspension and ventilation',
      price: 45.99,
      images: ['/images/placeholder.svg'],
      inStock: true,
      category: { name: 'Safety Equipment', slug: 'safety-equipment' }
    },
    {
      _id: '3',
      id: 3,
      title: 'Measuring Tape 25ft',
      description: 'Professional grade measuring tape with magnetic tip and standout',
      price: 24.99,
      originalPrice: 29.99,
      images: ['/images/placeholder.svg'],
      inStock: true,
      category: { name: 'Measuring Tools', slug: 'measuring-tools' }
    },
    {
      _id: '4',
      id: 4,
      title: 'Angle Grinder 120V',
      description: 'Powerful 4.5-inch angle grinder for cutting and grinding applications',
      price: 89.99,
      images: ['/images/placeholder.svg'],
      inStock: false,
      category: { name: 'Power Tools', slug: 'power-tools' }
    }
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our top-rated tools and equipment
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <motion.div
              key={getProductId(product)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/products/${getProductId(product)}`}>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {getProductImages(product).length > 0 ? (
                      <Image
                        src={getProductImages(product)[0]}
                        alt={getProductTitle(product)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wide">
                      {getCategoryName(product)}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {getProductTitle(product)}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-4 pt-0">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 border border-gray-200 rounded-lg hover:border-blue-600 transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link 
            href="/products" 
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
