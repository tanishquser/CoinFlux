require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');

const sequelize = require('./config/db');
const User = require('./models/user.model'); // Make sure model is loaded

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



// Middleware
app.use(express.json());

// Routes
app.use('/user', authRoutes);

// Server
const PORT = process.env.USER_SERVICE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});