const Wallet = require('../models/wallet.model');
const Transaction = require('../models/transaction.model');
const sequelize = require('../config/db');
const publishToQueue = require('../utils/rabbitmq.publisher');

const getBalance = async (req, res) => {
  const userId = req.user.userId;
  const wallet = await Wallet.findOne({ where: { userId } });
  return res.json({ balance: wallet?.balance || 0 });
};

const fundWallet = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  const amount = parseFloat(req.body.amount);

  if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

  const wallet = await Wallet.findOrCreate({ where: { userId }, defaults: { balance: 0 } });
  console.log(wallet);
  wallet[0].balance += amount;
  await wallet[0].save();
  await Transaction.create({
      userId: userId,
      type: 'fund',
      amount: amount,
      details: `${amount} added to wallet`
  });


  return res.json({ message: 'Wallet funded', balance: wallet[0].balance });
};

const debitWallet = async (req, res) => {
  const userId = req.user.userId;
  const amount = parseFloat(req.body.amount);

  const wallet = await Wallet.findOne({ where: { userId } });
  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
      userId: userId,
      type: 'debit',
      amount: amount,
      details: `${amount} debitted from wallet`
  });

  return res.json({ message: 'Amount debited', balance: wallet.balance });
};

const transferFunds = async (req, res) => {
  const senderId = req.user.userId;
  const { receiverId, amount } = req.body;

  const t = await sequelize.transaction(); // begin

  try {
    const senderWallet = await Wallet.findOne({ where: { userId: senderId }, transaction: t, lock: true });
    const receiverWallet = await Wallet.findOne({ where: { userId: receiverId }, transaction: t, lock: true });
    console.log(receiverWallet);

    if (senderWallet.balance < amount) throw new Error('Insufficient funds');

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save({ transaction: t });
    await receiverWallet.save({ transaction: t });

    await Transaction.create({
      userId: senderId,
      type: 'transfer_out',
      amount: amount,
      details: `To user ${receiverId}`
    }, { transaction: t });

    await Transaction.create({
      userId: receiverId,
      type: 'transfer_in',
      amount: amount,
      details: `From user ${senderId}`
    }, { transaction: t });

    await t.commit();

    await publishToQueue({
      queueName: process.env.NOTIFICATION_QUEUE,
      payload: {
        email: 'tanxyz53@gmail.com',
        subject: 'Funds Transferred',
        message: `You sent ₹${amount} to user ${receiverId}`,
      }
    });

    res.json({ message: 'Transfer successful' });

  } catch (err) {
    await t.rollback();
    console.log(err);
    await publishToQueue({
      queueName: process.env.DISPUTE_QUEUE,
      payload: {
        senderId,
        receiverId,
        amount,
        reason: err.message,
        timestamp: new Date().toISOString()
      }
    });
    res.status(400).json({ message: err.message });
  }
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.findAll({
    where: { userId: req.user.userId },
    order: [['createdAt', 'DESC']]
  });

  res.json({ transactions });
};

module.exports = { getBalance, fundWallet, debitWallet, transferFunds, getTransactions };