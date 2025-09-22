const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please provide your name'
      },
      len: {
        args: [1, 100],
        msg: 'Name cannot be more than 100 characters'
      }
    },
    set(value) {
      this.setDataValue('name', value ? value.trim() : value);
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email'
      },
      notEmpty: {
        msg: 'Please provide your email'
      }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    validate: {
      len: {
        args: [0, 20],
        msg: 'Phone number cannot be more than 20 characters'
      }
    },
    set(value) {
      this.setDataValue('phone', value ? value.trim() : value);
    }
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please provide a subject'
      },
      len: {
        args: [1, 200],
        msg: 'Subject cannot be more than 200 characters'
      }
    },
    set(value) {
      this.setDataValue('subject', value ? value.trim() : value);
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please provide a message'
      },
      len: {
        args: [1, 1000],
        msg: 'Message cannot be more than 1000 characters'
      }
    }
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isReplied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  adminNotes: {
    type: DataTypes.STRING(500),
    validate: {
      len: {
        args: [0, 500],
        msg: 'Admin notes cannot be more than 500 characters'
      }
    }
  },
}, {
  tableName: 'contacts',
});

module.exports = Contact;
