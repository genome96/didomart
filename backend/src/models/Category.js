const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Please provide a category name",
        },
        len: {
          args: [1, 50],
          msg: "Category name cannot be more than 50 characters",
        },
      },
      set(value) {
        this.setDataValue("name", value ? value.trim() : value);
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
      type: DataTypes.STRING(500),
      validate: {
        len: {
          args: [0, 500],
          msg: "Description cannot be more than 500 characters",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "default-category.jpg",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
  },
  {
    tableName: "categories",
    hooks: {
      beforeSave: (category) => {
        if (category.changed("name") || !category.slug) {
          category.slug = category.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        }
      },
    },
  }
);

module.exports = Category;
