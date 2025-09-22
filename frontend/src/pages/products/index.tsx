import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Pagination from '@/components/common/Pagination';
import { Product, Category } from '@/types';
import api from '@/lib/api';

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
  filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  };
}

export default function ProductsPage({
  products,
  categories,
  total,
  totalPages,
  currentPage,
  filters
}: ProductsPageProps) {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Your Business';

  return (
    <>
      <NextSeo
        title={`Products - ${businessName}`}
        description="Browse our extensive collection of quality tools, equipment, and machinery. Find everything you need for your projects."
        canonical={`${process.env.NEXT_PUBLIC_CLIENT_URL}/products`}
      />

      <Layout>
        <div className="bg-white">
          {/* Header */}
          <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Our Products
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover our wide range of quality tools, equipment, and machinery. 
                  From power tools to solar systems, we have everything you need for your projects.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <ProductFilters
                  categories={categories}
                  filters={filters}
                />
              </div>

              {/* Products Grid */}
              <div className="lg:w-3/4">
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {products.length} of {total} products
                  </p>
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {products.map((product) => (
                      <ProductCard key={product._id || (product as any).id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          vectorEffect="non-scaling-stroke"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2V13m16 0L12 20l-8-7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search criteria or browse our categories.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/products"
                    searchParams={filters}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const {
      page = '1',
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'newest'
    } = query;

    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page as string);
    params.append('limit', '12');
    params.append('sort', sort as string);

    if (category) params.append('category', category as string);
    if (search) params.append('search', search as string);
    if (minPrice) params.append('minPrice', minPrice as string);
    if (maxPrice) params.append('maxPrice', maxPrice as string);

    // Fetch products and categories
    const [productsResponse, categoriesResponse] = await Promise.all([
      api.get(`/products?${params.toString()}`),
      api.get('/categories?active=true')
    ]);

    const { data: products, total, totalPages, currentPage } = productsResponse.data;
    const { data: categories } = categoriesResponse.data;

    return {
      props: {
        products,
        categories,
        total,
        totalPages,
        currentPage,
        filters: {
          category: category || null,
          search: search || null,
          minPrice: minPrice ? Number(minPrice) : null,
          maxPrice: maxPrice ? Number(maxPrice) : null,
          sort: sort || 'newest'
        }
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
        categories: [],
        total: 0,
        totalPages: 1,
        currentPage: 1,
        filters: {}
      }
    };
  }
};
