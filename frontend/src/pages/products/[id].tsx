import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { motion } from 'framer-motion';
import { getProductImages } from '../../utils/imageUtils';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  stockQuantity: number;
  sku?: string;
  tags: string[];
  isFeatured: boolean;
  isHotDeal: boolean;
  status: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ProductPageProps {
  product: Product | null;
  relatedProducts: Product[];
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fix image URLs to handle both old incorrect URLs and new correct ones
  const fixedImages = product ? getProductImages(product) : [];
  const fixedRelatedProducts = relatedProducts.map(p => ({
    ...p,
    images: getProductImages(p)
  }));

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { productId: product.id, quantity });
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log('Buy now:', { productId: product.id, quantity });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={fixedImages[selectedImageIndex] || '/images/placeholder.svg'}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {fixedImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {fixedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <nav className="text-sm text-gray-500 mb-2">
                <span>Home</span> / <span>Products</span> / <span>{product.category.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              {product.sku && (
                <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">KSh {product.price}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  KSh {product.compareAtPrice}
                </span>
              )}
              {product.isHotDeal && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  Hot Deal
                </span>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: Math.min(product.stockQuantity, 10) }, (_, i) => i + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    )
                  )}
                </select>
                <span className="text-sm text-gray-500">
                  {product.stockQuantity} in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fixedRelatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div className="aspect-square bg-gray-100">
                      <Image
                        src={relatedProduct.images[0] || '/images/placeholder.svg'}
                        alt={relatedProduct.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.title}</h3>
                      <p className="text-blue-600 font-bold">KSh {relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    const API_URL = process.env.API_URL || 'http://localhost:5000/api';

    // Fetch product
    const productRes = await fetch(`${API_URL}/products/${id}`);
    let product = null;
    let relatedProducts = [];

    if (productRes.ok) {
      const productData = await productRes.json();
      product = productData.data;

      // Fetch related products
      try {
        const relatedRes = await fetch(`${API_URL}/products/${id}/related`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          relatedProducts = relatedData.data || [];
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    }

    return {
      props: {
        product,
        relatedProducts,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
        relatedProducts: [],
      },
    };
  }
};