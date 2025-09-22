import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  };
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categories, filters }) => {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    search: filters.search || '',
    sort: filters.sort || 'newest'
  });
  
  // Separate state for price inputs (not applied until user clicks Apply)
  const [priceInputs, setPriceInputs] = useState({
    minPrice: filters.minPrice?.toString() || '',
    maxPrice: filters.maxPrice?.toString() || ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    
    // Update URL with new filters
    const query: any = { ...router.query };
    
    if (value) {
      query[key] = value;
    } else {
      delete query[key];
    }
    
    // Reset to page 1 when filters change
    delete query.page;
    
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const handlePriceInputChange = (key: 'minPrice' | 'maxPrice', value: string) => {
    setPriceInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyPriceFilter = () => {
    const query: any = { ...router.query };
    
    // Apply min price
    if (priceInputs.minPrice) {
      query.minPrice = priceInputs.minPrice;
    } else {
      delete query.minPrice;
    }
    
    // Apply max price
    if (priceInputs.maxPrice) {
      query.maxPrice = priceInputs.maxPrice;
    } else {
      delete query.maxPrice;
    }
    
    // Reset to page 1 when filters change
    delete query.page;
    
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const clearFilters = () => {
    const newFilters = {
      category: '',
      search: '',
      sort: 'newest'
    };
    setLocalFilters(newFilters);
    setPriceInputs({
      minPrice: '',
      maxPrice: ''
    });
    
    router.push({
      pathname: router.pathname,
      query: { sort: 'newest' }
    });
  };

  const hasActiveFilters = localFilters.category || localFilters.search || filters.minPrice || filters.maxPrice;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id || (category as any).id} value={category._id || (category as any).id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={priceInputs.minPrice}
                onChange={(e) => handlePriceInputChange('minPrice', e.target.value)}
                placeholder="Min"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={priceInputs.maxPrice}
                onChange={(e) => handlePriceInputChange('maxPrice', e.target.value)}
                placeholder="Max"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            >
              Apply Price Filter
            </button>
            {(filters.minPrice || filters.maxPrice) && (
              <div className="text-sm text-gray-600">
                Current: {filters.minPrice ? `KSh ${filters.minPrice}` : 'No min'} - {filters.maxPrice ? `KSh ${filters.maxPrice}` : 'No max'}
              </div>
            )}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={localFilters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Filters
          </label>
          <div className="space-y-2">
            <button
              onClick={() => {
                const newQuery: { [key: string]: string } = { ...router.query, featured: 'true' };
                if (newQuery.page) delete newQuery.page;
                router.push({ pathname: router.pathname, query: newQuery });
              }}
              className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Featured Products
            </button>
            <button
              onClick={() => {
                const newQuery: { [key: string]: string } = { ...router.query, hotdeal: 'true' };
                if (newQuery.page) delete newQuery.page;
                router.push({ pathname: router.pathname, query: newQuery });
              }}
              className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            >
              Hot Deals
            </button>
            <button
              onClick={() => {
                const newQuery: { [key: string]: string } = { ...router.query, inStock: 'true' };
                if (newQuery.page) delete newQuery.page;
                router.push({ pathname: router.pathname, query: newQuery });
              }}
              className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
            >
              In Stock Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
