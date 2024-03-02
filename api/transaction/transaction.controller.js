const TransactionService = require('./transaction.service');

const addTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    const transactionId = await TransactionService.addTransaction(transaction);
    res.json({ success: 1, message: 'Transaction added successfully', transaction_id: transactionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: 'Internal server error' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await TransactionService.getTransactions();
    res.json({ success: 1, data: transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: 'Internal server error' });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};