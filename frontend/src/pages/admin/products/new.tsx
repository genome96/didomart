import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewProduct() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    categoryId: '',
    inStock: true,
    stockQuantity: '',
    images: [],
    tags: [],
    isFeatured: false,
    isHotDeal: false,
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminAuth === 'true' && adminToken) {
      setIsAuthenticated(true);
      setLoading(false);
      fetchCategories();
    } else {
      router.push('/admin');
    }
  }, [router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Authentication required. Please login again.');
        router.push('/admin');
        return;
      }

      // Validate required fields before sending
      if (!product.name || product.name.trim().length < 2) {
        alert('Product name must be at least 2 characters long');
        return;
      }
      
      if (!product.description || product.description.trim().length < 10) {
        alert('Product description must be at least 10 characters long');
        return;
      }
      
      if (!product.price || parseFloat(product.price) <= 0) {
        alert('Product price must be a positive number');
        return;
      }
      
      if (!product.categoryId || parseInt(product.categoryId) <= 0) {
        alert('Please select a valid category');
        return;
      }

      const productData = {
        title: product.name.trim(),
        description: product.description.trim(),
        price: parseFloat(product.price),
        originalPrice: product.comparePrice ? parseFloat(product.comparePrice) : null,
        categoryId: parseInt(product.categoryId),
        inStock: product.inStock,
        stockQuantity: parseInt(product.stockQuantity) || 0,
        tags: product.tags,
        isFeatured: product.isFeatured,
        isHotDeal: product.isHotDeal,
        images: product.images,
      };

      console.log('Sending product data:', productData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product saved successfully!');
        router.push('/admin/products');
      } else {
        const errorData = await response.json();
        console.error('Save error:', errorData);
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.map(err => err.msg || err.message).join('\n');
          alert(`Failed to save product:\n${errorMessages}`);
        } else {
          alert(`Failed to save product: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (files: FileList) => {
    const token = localStorage.getItem('adminToken');
    console.log('Admin token:', token ? 'exists' : 'missing');
    if (!token) {
      alert('Authentication required. Please login again.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const uploadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/upload/product-image`;
        console.log('Upload URL:', uploadUrl);
        
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        console.log('Upload response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Upload success:', data);
          // Construct correct image URL without /api
          const baseUrl = 'http://localhost:5000'; // Direct base URL without /api
          const imageUrl = `${baseUrl}${data.data.url}`;
          console.log('Final image URL:', imageUrl);
          setProduct(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        } else {
          const errorData = await response.text();
          console.error('Upload failed:', response.status, errorData);
          alert(`Failed to upload ${file.name}: ${response.status} ${errorData}`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert(`Error uploading ${file.name}: ${error.message}`);
      }
    }
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, url.trim()]
      }));
    }
  };

  const removeImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    const tag = prompt('Enter tag:');
    if (tag && tag.trim() && !product.tags.includes(tag.trim())) {
      setProduct(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const removeTag = (index: number) => {
    setProduct(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  if (!isAuthenticated || loading) {
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
        title="Add New Product"
        description="Add a new product to the catalog"
      />

      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product for your catalog</p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={product.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={product.categoryId}
                    onChange={(e) => handleInputChange('categoryId', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (KSh)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Compare Price (KSh)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={product.comparePrice}
                    onChange={(e) => handleInputChange('comparePrice', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Optional: Original price before discount</p>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                  <input
                    type="number"
                    value={product.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    checked={product.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Product is in stock
                  </label>
                </div>
              </div>
            </div>

            {/* Tags and Features */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags & Features</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Tags</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['New', 'Hot Deal', 'Best Seller', 'Sale', 'Limited', 'Popular'].map((tag) => (
                      <label key={tag} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={product.tags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('tags', [...product.tags, tag]);
                            } else {
                              handleInputChange('tags', product.tags.filter((t: string) => t !== tag));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={product.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                  </label>
                  
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={product.isHotDeal}
                      onChange={(e) => handleInputChange('isHotDeal', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Hot Deal</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
              
              {/* Current Images */}
              {product.images.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-32 object-cover border rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                <p className="text-gray-500">Drag and drop images here, or click to select files</p>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="mt-4"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(e.target.files);
                    }
                  }}
                />
              </div>

              {/* Add Image URL */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500">Or add images by URL</p>
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Image URL
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </>
  );
}
