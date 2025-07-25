const express = require("express");
const router = express.Router();
const Dispute = require("../models/dispute.model");
const verifyToken = require("../middlewares/auth");

// POST a dispute
router.post("/", verifyToken, async (req, res) => {
  const { userId, transactionId, reason } = req.body;
  const dispute = await Dispute.create({ userId, transactionId, reason });
  res.status(201).json(dispute);
});

// GET all disputes
router.get("/", verifyToken, async (req, res) => {
  const disputes = await Dispute.findAll();
  res.json(disputes);
});

module.exports = router;