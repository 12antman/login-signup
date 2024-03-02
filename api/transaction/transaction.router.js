const express = require('express');
const router = express.Router();
const TransactionController = require('./transaction.controller');

router.post('/transactions', TransactionController.addTransaction);
router.get('/transactions', TransactionController.getTransactions);

module.exports = router;