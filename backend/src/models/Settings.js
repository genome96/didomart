const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  siteName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Dido Business'
  },
  siteDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Your one-stop shop for quality products'
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'contact@dido.com'
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '+1 (555) 123-4567'
  },
  contactAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '123 Business St, City, State 12345'
  },
  businessHours: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed'
  },
  socialMedia: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  },
  shippingInfo: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Free shipping on orders over KSh 5,000'
  },
  returnPolicy: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '30-day return policy on all items'
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'KES'
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: false,
    defaultValue: 0.0875
  },
  maintenanceMode: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'settings',
  timestamps: true
});

module.exports = Settings;