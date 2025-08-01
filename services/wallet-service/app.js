const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./config/db');
const walletRoutes = require('./routes/wallet.routes');

// Load Models (important to sync them with DB)
require('./models/wallet.model');
require('./models/transaction.model');

// Use JSON body parser
app.use(express.json());


// Wallet routes
app.use('/wallet', walletRoutes);

// DB Connect & Sync with Retry
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to MySQL');

      await sequelize.sync(); // Ensure tables exist
      console.log('✅ Models synced');

      break;
    } catch (err) {
      console.error('❌ DB connection failed:', err.message);
      retries--;
      if (retries === 0) process.exit(1);
      console.log(`🔁 Retrying DB connection in ${delay / 1000}s...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

connectWithRetry();

const PORT = process.env.WALLET_SERVICE_PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Wallet Service running at http://localhost:${PORT}`);
});