const { Sequelize } = require('sequelize');

const DATABASE_URL = `postgres:[${process.env.DB_PASSWORD}]@db.usghgpcjuvcjhijoiwlx.supabase.co:5432/postgres`;
const sequelize = new Sequelize(DATABASE_URL);
module.exports = sequelize;