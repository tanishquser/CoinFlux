const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const startConsumer = require('./consumers/notification.consumer');

startConsumer(); // No Express server needed for now

const PORT = process.env.NOTIFICATION_PORT || 3004;
app.listen(PORT, () => {
  console.log(`🚀 Wallet Service running at http://localhost:${PORT}`);
});