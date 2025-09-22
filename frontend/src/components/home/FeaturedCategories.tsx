import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


import { Category } from '@/types';

interface FeaturedCategoriesProps {
  categories?: Category[];
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories = [] }) => {
  // Default categories if none provided
  // Fallback image if category image is missing
  const fallbackImage = '/images/placeholder.jpg';
  const displayCategories = categories || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Find exactly what you need from our carefully organized categories
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category, index) => {
            // Build image URL (handle absolute or relative)
            const categoryId = (category as any).id || category._id;
            let imageUrl = category.image || fallbackImage;
            
            // Handle different image scenarios
            if (imageUrl && !imageUrl.startsWith('http')) {
              if (imageUrl === 'default-category.jpg') {
                // Use fallback for default placeholder
                imageUrl = fallbackImage;
              } else {
                // Construct URL for uploaded images
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${imageUrl}`;
              }
            }
            
            return (
              <motion.div
                key={categoryId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/products?category=${categoryId}`}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    {/* Category image */}
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={category.name}
                        className="object-cover w-full h-full"
                        onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                        <span>Explore Category</span>
                        <svg 
                          className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all categories button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-3 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            View All Categories
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
