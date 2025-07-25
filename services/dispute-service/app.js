const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./config/db");
const startConsumer = require("./consumers/transaction.consumer");

app.use(express.json());

const cron = require("node-cron");
const autoReviewDisputes = require("./jobs/autoReview.job");

// Run every minute
cron.schedule("* * * * *", () => {
  console.log("⏰ Running scheduled auto-review job...");
  autoReviewDisputes();
});

const disputeRoutes = require("./routes/dispute.route");
app.use("/dispute", disputeRoutes);

const PORT = process.env.DISPUTE_PORT || 3005;

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ DB connected");
    startConsumer();
    console.log(`🚀 Dispute Service running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Failed to connect DB", err);
  }
});