const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('fund', 'debit', 'transfer_in', 'transfer_out'),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING, // E.g. "Transferred to user 4"
    allowNull: true
  }
});

module.exports = Transaction;