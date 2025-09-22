# Dido E-Commerce Platform

A modern full-stack e-commerce website built with Node.js, Express, SQLite (via Sequelize), React, and Next.js 14. Features a professional admin dashboard, real product catalog, and a beautiful, mobile-first UI. All prices and currency are in Kenyan Shillings (KSh).

## 🚀 Features

### Backend API

- **Node.js & Express** - RESTful API with comprehensive endpoints
- **SQLite & Sequelize** - Fast, file-based database with robust ORM
- **JWT Authentication** - Secure admin authentication and authorization
- **Admin Dashboard** - Full product, category, and settings management
- **File Upload** - Image upload for products and categories
- **Security** - Helmet, CORS, rate limiting, and input validation
- **Error Handling** - Centralized error handling and logging

### Frontend (Next.js 14)

- **React & Next.js 14** - Server-side rendering (SSR) for fast, SEO-friendly pages
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive design system
- **Framer Motion** - Smooth animations and transitions
- **Context API** - Global settings and state management
- **SEO Optimized** - Meta tags, Open Graph, and performance

### Admin Dashboard

- **Product Management** - Add, edit, delete products with categories
- **Category Management** - Organize products into categories
- **Settings Management** - Business info, currency (KSh), WhatsApp, and more
- **Contact Management** - View and respond to customer inquiries
- **File Upload** - Image management for products and categories
- **Dashboard Analytics** - Overview of key metrics

### Customer Features

- **Product Catalog** - 300+ demo products with real Unsplash images
- **Shop by Category** - Beautiful category images (Unsplash)
- **Search & Filter** - Real-time search, price filtering, category filtering
- **Product Details** - Detailed product pages with specs and related products
- **Contact Forms** - Dynamic, admin-configurable contact page
- **Social Integration** - WhatsApp, Facebook, Instagram links
- **Mobile-First Design** - Optimized for all device sizes

## 📁 Project Structure

```
business-website/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Sequelize models (SQLite)
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Express server
│   ├── uploads/            # File uploads directory (images)
│   ├── package.json
│   └── .env.example
├── frontend/               # Next.js 14 React app
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/     # React components
│   │   ├── styles/         # CSS styles
│   │   ├── lib/            # Utility libraries
│   │   ├── hooks/          # Custom React hooks
│   │   ├── contexts/       # React context
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── package.json
│   └── next.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or later)
- Git

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update environment variables in `.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000


# Database
# Uses SQLite (no setup required, file-based)

# JWT Configuration
JWT_SECRET=DIDOmart2025
JWT_EXPIRE=30d

# Email Configuration (Gmail example)

# Email (optional, for contact form notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourbusiness.com


# File Upload
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./uploads


# Client URL
CLIENT_URL=http://localhost:3000


# Admin Configuration
ADMIN_EMAIL=admin@yourbusiness.com
ADMIN_PASSWORD=AdminPassword123!
```

5. Start the development server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup (Next.js 14)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:

```env

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000


# Business Information
NEXT_PUBLIC_BUSINESS_NAME=Your Business Name
NEXT_PUBLIC_BUSINESS_EMAIL=info@yourbusiness.com
NEXT_PUBLIC_BUSINESS_PHONE=+254700000000
NEXT_PUBLIC_BUSINESS_ADDRESS=Your Business Address


# Social Media
NEXT_PUBLIC_WHATSAPP_NUMBER=+254700000000
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourbusiness
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourbusiness
```

5. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📋 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/slug/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin/Editor)
- `PUT /api/categories/:id` - Update category (Admin/Editor)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Products

- `GET /api/products` - Get all products (with filters, pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/hot-deals` - Get hot deals
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin/Editor)
- `GET /api/contact/stats` - Get contact statistics (Admin/Editor)
- `GET /api/contact/:id` - Get contact by ID (Admin/Editor)
- `PUT /api/contact/:id` - Update contact status (Admin/Editor)
- `DELETE /api/contact/:id` - Delete contact (Admin)

### Admin

- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/products` - Get all products for admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/upload/product-image` - Upload product image
- `POST /api/admin/upload/category-image` - Upload category image
- `DELETE /api/admin/upload/:filename` - Delete uploaded image
- `PUT /api/admin/users/:id` - Update user role/status
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design inspired by leading e-commerce sites
- **Mobile-First** - Responsive design that works on all devices
- **Fast Loading** - Optimized images and code splitting
- **Smooth Animations** - Framer Motion for engaging user interactions
- **Accessibility** - WCAG compliant design and interactions
- **SEO Friendly** - Meta tags, structured data, and performance optimized

## 🔐 Security Features

- **Authentication** - JWT-based authentication system
- **Authorization** - Role-based access control
- **Data Validation** - Input validation and sanitization
- **Rate Limiting** - Protection against API abuse
- **CORS** - Cross-origin resource sharing configuration
- **Helmet** - Security headers and protections
- **File Upload Security** - File type and size restrictions

## 📧 Email Features

- **Contact Form** - Automated email notifications for new inquiries
- **Auto-Reply** - Professional auto-reply emails to customers
- **HTML Templates** - Beautiful, responsive email templates
- **SMTP Support** - Works with Gmail, SendGrid, and other providers

## 🚀 Deployment

### Backend Deployment (Node.js)

1. **Environment Variables**: Set up production environment variables
2. **Database**: SQLite database file will be automatically created
3. **Process Manager**: Use PM2 or similar for production
4. **Reverse Proxy**: Configure Nginx or Apache if needed

### Frontend Deployment (Vercel/Netlify)

1. **Build**: Run `npm run build` to create production build
2. **Environment Variables**: Set up production environment variables
3. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

### Docker Deployment

Docker configurations can be added for containerized deployment.

## 🧪 Default Data

The system includes sample data for quick testing:

### Default Admin User

- **Email**: admin@yourbusiness.com
- **Password**: AdminPassword123!

### Sample Categories

- Power Tools
- Hand Tools
- Solar Systems
- Water Pumps
- Welding Equipment
- Weighing Scales
- Safety Equipment
- Garden & Outdoor
- Solar & Energy
- Construction Equipment

### Sample Products

- 300+ demo products with real Unsplash images
- Realistic product names, brands, and specs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Email: support@yourbusiness.com
- Phone: +254700000000
- Documentation: Check the API documentation in the `/docs` folder

## 🔄 Updates

Regular updates include:

- Security patches
- New features
- Performance improvements
- Bug fixes

Check the CHANGELOG.md for detailed update information.

---

**Built with ❤️ for modern businesses in Kenya**
