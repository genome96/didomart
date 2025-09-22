const { sequelize, testConnection } = require("../config/database");
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Contact = require("./Contact");
const Settings = require("./Settings");

// Define relationships
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

// Sync database
const syncDatabase = async () => {
  try {
    // This will create the tables if they don't exist
    // Using force: false to avoid recreating tables with data
    await sequelize.sync({ force: false });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  User,
  Category,
  Product,
  Contact,
  Settings,
  syncDatabase,
};
