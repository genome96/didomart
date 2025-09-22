# Full-Stack Business Website

A complete e-commerce website built with Node.js, Express, MongoDB, React, and Next.js. Inspired by modern business websites with professional design and comprehensive features.

## 🚀 Features

### Backend API

- **Node.js & Express** - RESTful API with comprehensive endpoints
- **MongoDB & Mongoose** - Robust data modeling and relationships
- **JWT Authentication** - Secure user authentication and authorization
- **Role-based Access Control** - Admin, Editor, and User roles
- **File Upload** - Image upload for products and categories
- **Email Integration** - Contact form notifications and auto-replies
- **Security** - Helmet, CORS, rate limiting, and input validation
- **Error Handling** - Centralized error handling and logging

### Frontend (Next.js)

- **React & Next.js** - Server-side rendering and static generation
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive design system
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Efficient data fetching and caching
- **React Hook Form** - Form validation and handling
- **SEO Optimized** - Meta tags, structured data, and optimizations

### Admin Dashboard

- **Product Management** - Add, edit, delete products with categories
- **Category Management** - Organize products into categories
- **User Management** - Manage user accounts and roles
- **Contact Management** - View and respond to customer inquiries
- **File Upload** - Image management for products and categories
- **Dashboard Analytics** - Overview of key metrics

### Customer Features

- **Product Catalog** - Browse products by category with filtering
- **Search & Filter** - Find products quickly with advanced filters
- **Product Details** - Detailed product pages with specifications
- **Contact Forms** - Easy communication with the business
- **Social Integration** - WhatsApp, Facebook, Instagram links
- **Mobile-First Design** - Optimized for all device sizes

## 📁 Project Structure

```
business-website/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Express server
│   ├── uploads/            # File uploads directory
│   ├── package.json
│   └── .env.example
├── frontend/               # Next.js React app
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/     # React components
│   │   ├── styles/         # CSS styles
│   │   ├── lib/            # Utility libraries
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context
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
- MongoDB (local or cloud)
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
MONGODB_URI=mongodb://localhost:27017/business_website

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Email Configuration (Gmail example)
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

### Frontend Setup

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

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/hot-deals` - Get hot deals
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin/Editor)
- `PUT /api/products/:id` - Update product (Admin/Editor)
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
2. **Database**: Ensure MongoDB is accessible
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

### Sample Products

- INGCO 680W Impact Drill
- 100W Solar Panel Kit
- Electric Submersible Water Pump 1HP
- Digital Platform Scale 100kg
- MMA 200A Welding Machine
- Tool Set 142 Pieces

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

**Built with ❤️ for modern businesses**
