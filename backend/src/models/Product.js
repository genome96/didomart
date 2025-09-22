const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a product title",
        },
        len: {
          args: [1, 100],
          msg: "Product title cannot be more than 100 characters",
        },
      },
      set(value) {
        this.setDataValue("title", value ? value.trim() : value);
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isLowercase: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a product description",
        },
        len: {
          args: [1, 2000],
          msg: "Description cannot be more than 2000 characters",
        },
      },
    },
    shortDescription: {
      type: DataTypes.STRING(200),
      validate: {
        len: {
          args: [0, 200],
          msg: "Short description cannot be more than 200 characters",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Price cannot be negative",
        },
        notEmpty: {
          msg: "Please provide a price",
        },
      },
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: {
          args: [0],
          msg: "Original price cannot be negative",
        },
      },
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Discount cannot be negative",
        },
        max: {
          args: [100],
          msg: "Discount cannot be more than 100%",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "Please provide a category",
        },
      },
    },
    images: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("images");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("images", JSON.stringify(value || []));
      },
    },
    specifications: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("specifications");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("specifications", JSON.stringify(value || []));
      },
    },
    tags: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("tags");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("tags", JSON.stringify(value || []));
      },
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Stock quantity cannot be negative",
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isHotDeal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    weight: {
      type: DataTypes.DECIMAL(8, 2),
      validate: {
        min: {
          args: [0],
          msg: "Weight cannot be negative",
        },
      },
    },
    dimensions: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("dimensions");
        return value ? JSON.parse(value) : {};
      },
      set(value) {
        this.setDataValue("dimensions", JSON.stringify(value || {}));
      },
    },
    seoTitle: {
      type: DataTypes.STRING(60),
      validate: {
        len: {
          args: [0, 60],
          msg: "SEO title cannot be more than 60 characters",
        },
      },
    },
    seoDescription: {
      type: DataTypes.STRING(160),
      validate: {
        len: {
          args: [0, 160],
          msg: "SEO description cannot be more than 160 characters",
        },
      },
    },
    seoKeywords: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("seoKeywords");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("seoKeywords", JSON.stringify(value || []));
      },
    },
  },
  {
    tableName: "products",
    hooks: {
      beforeSave: (product) => {
        if (product.changed("title") || !product.slug) {
          product.slug = product.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        }
      },
    },
  }
);

// Virtual field for discount percentage
Product.prototype.getDiscountPercentage = function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return this.discount;
};

module.exports = Product;
