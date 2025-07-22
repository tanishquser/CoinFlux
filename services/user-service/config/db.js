const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  `postgresql://postgres.usghgpcjuvcjhijoiwlx:${process.env.DB_PASSWORD}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;