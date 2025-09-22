# Backend API

This is the backend API for the business website built with Node.js, Express, and SQLite.

## Features

- RESTful API design
- JWT authentication
- Role-based access control
- File upload handling
- Email notifications
- Data validation
- Security middleware
- SQLite with Sequelize ORM

## API Endpoints

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

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update environment variables in `.env`

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

See `.env.example` for all required environment variables.

## Database Setup

SQLite database file will be automatically created at `./database.sqlite` on first run. No additional setup required.

## Default Admin User

The system creates a default admin user on first run:

- Email: admin@yourbusiness.com (configurable)
- Password: AdminPassword123! (configurable)

## File Uploads

Product and category images are stored in the `uploads/` directory and served statically at `/uploads/`.

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Password hashing
- Input validation
- File upload restrictions
