// Utility function to fix image URLs
export const fixImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '/images/placeholder.svg';
  
  // If it's already a full URL with the wrong /api path, fix it
  if (imageUrl.includes('/api/uploads/')) {
    return imageUrl.replace('/api/uploads/', '/uploads/');
  }
  
  // If it's already a correct full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's just a filename, construct the correct URL
  if (!imageUrl.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${imageUrl}`;
  }
  
  // If it's a relative path starting with /uploads, make it absolute
  if (imageUrl.startsWith('/uploads/')) {
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imageUrl}`;
  }
  
  return imageUrl;
};

// Helper to get the first image from a product
export const getProductImage = (product: any): string => {
  if (product.images && product.images.length > 0) {
    return fixImageUrl(product.images[0]);
  }
  return '/images/placeholder.svg';
};

// Helper to get all fixed image URLs from a product
export const getProductImages = (product: any): string[] => {
  if (product.images && Array.isArray(product.images)) {
    return product.images.map(fixImageUrl);
  }
  return ['/images/placeholder.svg'];
};