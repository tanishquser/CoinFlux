const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wallet = sequelize.define('Wallet', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false
  }
});

module.exports = Wallet;