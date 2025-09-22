import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import { getProductImage } from '@/utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Use _id or id depending on what's available
  const productId = product._id || (product as any).id;

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${productId}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
            <Image
              src={getProductImage(product)}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.svg';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-2">
              {hasDiscount && (
                <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  -{discountPercentage}%
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  Featured
                </span>
              )}
              {product.isHotDeal && (
                <span className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  Hot Deal
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col space-y-2">
                <button className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <EyeIcon className="h-4 w-4 text-gray-600" />
                </button>
                {product.inStock && (
                  <button className="bg-blue-600 p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <ShoppingCartIcon className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-sm text-blue-600 font-medium mb-1">
              {product.category.name}
            </p>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.shortDescription}
              </p>
            )}

            {/* Rating (if available) */}
            {product.viewCount && product.viewCount > 0 && (
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-4 w-4 ${
                        star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.viewCount} views)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  KSh {product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    KSh {product.originalPrice!.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="text-sm">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
