const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dispute = sequelize.define('Dispute', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.STRING,
  transactionId: DataTypes.STRING,
  reason: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = Dispute;