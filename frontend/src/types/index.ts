export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'editor' | 'admin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount: number;
  discountPercentage?: number;
  category: Category;
  images: ProductImage[];
  specifications: ProductSpecification[];
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  isHotDeal: boolean;
  viewCount: number;
  weight?: number;
  dimensions?: ProductDimensions;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  adminNotes?: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  errors?: any[];
}

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  hotdeal?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  totalUsers: number;
  pendingContacts: number;
}

export interface RecentActivity {
  products: Product[];
  contacts: Contact[];
}

export interface AdminDashboard {
  stats: DashboardStats;
  recentActivity: RecentActivity;
}

export interface UploadResponse {
  filename: string;
  url: string;
  originalName: string;
  size: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Form types
export interface CategoryForm {
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductForm {
  title: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount: number;
  category: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  isHotDeal: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

// Social media types
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
