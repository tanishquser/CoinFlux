const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/balance', verifyToken, walletController.getBalance);
router.post('/fund', verifyToken, walletController.fundWallet);
router.post('/debit', verifyToken, walletController.debitWallet);
router.post('/transfer', verifyToken, walletController.transferFunds);
router.get('/transactions', verifyToken, walletController.getTransactions);

module.exports = router;